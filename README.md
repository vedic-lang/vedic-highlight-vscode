<p align="center">
    <a href="https://vedic-lang.github.io">
        <img alt="Vedic"src="https://raw.githubusercontent.com/vedic-lang/vedic/main/assets/vedic-lang.png" width="300vw"/>
    </a>
    <br>
    <a href="https://vedic-lang.github.io/download">Download</a> ·
    <a href="https://vedic-lang.github.io/">Documentation</a> ·
    <a href="https://vedic-lang.github.io/vedic-ide">Online Ide</a>
    <br><br>
    <i>Loved the tool? Please consider <a href="https://paypal.me/ptprashanttripathi/10">donating</a> to help it improve!</i>
    <br>
	<a href="https://paypal.me/PtPrashantTripathi">
        <img height='23' src="https://img.shields.io/badge/support-PayPal-blue?logo=PayPal&style=flat-square&label=Donate" alt="Donate"/>
    </a>
	<a href='https://ko-fi.com/ptprashanttripathi' target='_blank'>
        <img height='23' width="100" src='https://cdn.ko-fi.com/cdn/kofi3.png?v=2' alt='Buy Coffee for ptprashanttripathi' />
    </a>
	<a href="https://www.buymeacoffee.com/ptprashant09" target="_blank">
        <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="23" width="100" style="border-radius:1px" />
    </a>
</p>

# Vedic Code Formatter

Format a Vedic document or run it from the editor. Install [Vedic CLI 2.1.0 or newer](https://vedic-lang.github.io/download) and make `vedic` available on your `PATH`. You can also set `vedic.executable` to its full path.

## Installation

Search for **Vedic Code Formatter** in Extensions, or run this command in VS Code Quick Open:

```text
ext install vedic.vedic
```

Existing users of **Vedic** receive the formatter through this listing. For syntax coloring, install [Vedic Code Highlighter](https://marketplace.visualstudio.com/items?itemName=vedic.vedic-syntax-highlighter) alongside it.

## Using the formatter

Open a local Vedic file in a trusted workspace. Choose **Format** in the editor title bar or run **Format Document**. The edit applies to the current buffer and can be undone before saving. **Run** saves the file and starts the Vedic CLI in the integrated terminal.

To select this formatter for Vedic documents, add the following to your VS Code settings:

```json
{
  "[vedic]": {
    "editor.defaultFormatter": "vedic.vedic"
  }
}
```

## 👤 Author

<p><a href="https://github.com/ptprashanttripathi"><img width="60" src="https://avatars2.githubusercontent.com/u/26687933?s=200&v=4"/></a></p>

[**Pt. Prashant Tripathi**](https://github.com/ptprashanttripathi)

- Twitter: [@ptprashant09](https://twitter.com/ptprashant09)
- Github: [@ptprashanttripathi](https://github.com/ptprashanttripathi)
- LinkedIn: [ptprashanttripathi](https://www.linkedin.com/in/ptprashanttripathi/) 
- Dev.to : [ptprashanttripathi](https://dev.to/ptprashanttripathi)

## 🤝 Contributing

Contributions, issues and feature requests are welcome. [Open an issue](https://github.com/vedic-lang/vedic-code-formatter/issues).

## Publishing a release

Pull requests build a VSIX that reviewers can download from the workflow run. To authorize publishing once, open the `vedic` publisher in the [Marketplace dashboard](https://marketplace.visualstudio.com/manage/publishers/vedic) and create a Trusted Publishing policy with these values.

| Field | Value |
| --- | --- |
| Policy name | Vedic Code Formatter release |
| Repository owner | `vedic-lang` |
| Repository | `vedic-code-formatter` |
| Workflow | `publish.yml` |
| Environment | `marketplace` |

For each release, merge the intended extension version into `main`. Open **Actions → Publish Vedic Code Formatter to Marketplace → Run workflow**, select `main` and enter the version in `package.json`. The workflow publishes the packaged VSIX under `vedic.vedic` using GitHub’s short-lived identity. [Publishing guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#_publish-with-github-actions-and-trusted-publishing)

## 👍 Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/ptprashanttripathi"><img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160"></a>

## 📝 License

Copyright © 2022 [Pt. Prashant Tripathi](https://github.com/ptprashanttripathi).<br />
See the [project license](https://github.com/vedic-lang/vedic-code-formatter/blob/main/LICENSE).

***

_Developed with ❤️ in India 🇮🇳_
