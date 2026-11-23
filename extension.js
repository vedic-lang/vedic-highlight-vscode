const childProcess = require("child_process");
const fs = require("fs").promises;
const os = require("os");
const path = require("path");
const vscode = require("vscode");
const { promisify } = require("util");

const execFile = promisify(childProcess.execFile);

function getExecutable() {
    return vscode.workspace.getConfiguration("vedic").get("executable", "vedic");
}

function getActiveVedicDocument() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== "vedic") {
        vscode.window.showInformationMessage("Open a Vedic source file first.");
        return undefined;
    }
    if (editor.document.uri.scheme !== "file") {
        vscode.window.showErrorMessage("Vedic commands require a file stored on this computer.");
        return undefined;
    }
    return editor.document;
}

function quoteForTerminal(value) {
    const platform = process.platform;
    const terminalSettings = vscode.workspace.getConfiguration("terminal.integrated");
    const platformName = platform === "win32" ? "windows" : platform === "darwin" ? "osx" : "linux";
    const defaultProfile = terminalSettings.get(`defaultProfile.${platformName}`, "");
    const profiles = terminalSettings.get(`profiles.${platformName}`, {});
    const selectedProfile = profiles[defaultProfile] || {};
    const shellPath = String(selectedProfile.path || defaultProfile).toLowerCase();

    if (shellPath.includes("cmd")) {
        return `"${value.replaceAll('"', '\\"')}"`;
    }
    if (shellPath.includes("powershell") || shellPath.includes("pwsh")) {
        return `'${value.replaceAll("'", "''")}'`;
    }
    if (shellPath.includes("bash") || shellPath.includes("zsh") || shellPath.includes("fish") || shellPath.includes("wsl")) {
        return `'${value.replaceAll("'", "'\\''")}'`;
    }
    if (platform === "win32") {
        return `'${value.replaceAll("'", "''")}'`;
    }
    return `'${value.replaceAll("'", "'\\''")}'`;
}

async function formatText(document) {
    const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "vedic-format-"));
    const tempFile = path.join(tempDirectory, "source.ved");
    try {
        await fs.writeFile(tempFile, document.getText(), "utf8");
        await execFile(getExecutable(), ["format", tempFile], {
            cwd: path.dirname(document.uri.fsPath),
            maxBuffer: 4 * 1024 * 1024,
        });
        return await fs.readFile(tempFile, "utf8");
    } finally {
        await fs.rm(tempDirectory, { recursive: true, force: true });
    }
}

async function formatActiveFile() {
    const document = getActiveVedicDocument();
    if (!document) return;

    try {
        const formatted = await formatText(document);
        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
        edit.replace(document.uri, fullRange, formatted);
        await vscode.workspace.applyEdit(edit);
    } catch (error) {
        vscode.window.showErrorMessage(`Vedic formatting failed: ${error.message}`);
    }
}

async function runActiveFile() {
    const document = getActiveVedicDocument();
    if (!document) return;

    if (!(await document.save())) return;

    const executable = getExecutable();
    const file = document.uri.fsPath;
    const terminal = vscode.window.terminals.find(existing => existing.name === "Vedic") ||
        vscode.window.createTerminal({ name: "Vedic", cwd: path.dirname(file) });
    terminal.show();
    terminal.sendText(`${quoteForTerminal(executable)} ${quoteForTerminal(file)}`);
}

function activate(context) {
    const formatter = vscode.languages.registerDocumentFormattingEditProvider("vedic", {
        async provideDocumentFormattingEdits(document) {
            try {
                const formatted = await formatText(document);
                const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
                return [vscode.TextEdit.replace(fullRange, formatted)];
            } catch (error) {
                vscode.window.showErrorMessage(`Vedic formatting failed: ${error.message}`);
                return [];
            }
        },
    });

    context.subscriptions.push(
        formatter,
        vscode.commands.registerCommand("vedic.formatFile", formatActiveFile),
        vscode.commands.registerCommand("vedic.runFile", runActiveFile),
    );
}

function deactivate() {}

module.exports = { activate, deactivate };
