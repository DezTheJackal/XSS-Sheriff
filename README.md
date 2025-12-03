# 🤠 XSS-Sheriff

<div align="center">

```
                  _.---._    /\\
                ./'       "--`\//
              ./              o \
             /./\  )______   \__ \
            ./  / /\ \   | \ \  \ \
               / /  \ \  | |\ \  \7
                "     "    "  "

            *BANG!* 💥 Got that bug!
```

**A fast and simple XSS vulnerability scanner for bug bounty hunters**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Created by **DezTheJackal**

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Legal Disclaimer](#%EF%B8%8F-legal-disclaimer)
- [How It Works](#-how-it-works)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**XSS-Sheriff** is a lightweight, beginner-friendly penetration testing tool designed specifically for authorized security research and bug bounty hunting. Like a sheriff keeping the digital frontier safe, this tool helps you hunt down Cross-Site Scripting (XSS) vulnerabilities quickly and efficiently.

Whether you're a seasoned security researcher or just starting your bug bounty journey, XSS-Sheriff provides an intuitive terminal interface to scan web applications for potential XSS vulnerabilities.

### Why XSS-Sheriff?

- 🚀 **Fast**: Automated testing with 12+ common XSS payloads
- 🎨 **Beautiful**: Clean, colorful terminal UI that's easy on the eyes
- 📚 **Educational**: Learn about XSS vulnerabilities while you hunt
- 🔧 **Simple**: No complex configuration - just run and scan
- 🌍 **Cross-platform**: Works on Linux, macOS, and Windows

---

## ✨ Features

- **🔍 Automated XSS Scanner**: Tests multiple parameters with various payloads
- **📚 Payload Library**: View and understand the testing payloads being used
- **🎯 Smart Detection**: Identifies reflected XSS vulnerabilities automatically
- **📊 Detailed Reporting**: Clear results with actionable next steps
- **🎨 Interactive Menu**: User-friendly interface for all skill levels
- **⚖️ Legal Compliance**: Built-in disclaimers and authorization checks
- **🔄 Real-time Progress**: Watch your tests run in real-time
- **💾 Lightweight**: No heavy dependencies, pure Node.js

---

## 📥 Installation

### Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** (comes with Node.js)

### Quick Install

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DezTheJackal/xss-sheriff.git
   cd xss-sheriff
   ```

2. **Make it executable** (Linux/Mac):
   ```bash
   chmod +x xss-sheriff.js
   ```

3. **Run it**:
   ```bash
   node xss-sheriff.js
   ```

### Alternative: Global Installation

To run XSS-Sheriff from anywhere on your system:

```bash
npm install -g .
xss-sheriff
```

---

## 🚀 Usage

### Basic Usage

Simply run the tool and follow the interactive menu:

```bash
node xss-sheriff.js
```

### Step-by-Step Guide

1. **Launch the tool**: Run `node xss-sheriff.js`

2. **Choose an option from the main menu**:
   - `[1]` - Start XSS Scanner
   - `[2]` - View Payload Library
   - `[3]` - About XSS-Sheriff
   - `[4]` - Exit

3. **For XSS Scanning**:
   - Select option `[1]`
   - Read and accept the legal disclaimer
   - Enter your target URL with parameters
   - Watch the scanner work its magic!

### Example Target URLs

```
✅ Good examples:
https://example.com/search?q=test
https://testsite.com/page?id=123&name=test
http://localhost:3000/search?query=hello

❌ Bad examples:
example.com (missing protocol)
https://example.com (no parameters to test)
```

### Command Line Quick Scan

For advanced users who want to skip the menu:

```bash
# Direct scan (coming in future version)
node xss-sheriff.js --scan "https://example.com/search?q=test"
```

---

## ⚖️ Legal Disclaimer

**🚨 IMPORTANT: READ BEFORE USE**

XSS-Sheriff is designed for **AUTHORIZED SECURITY TESTING ONLY**.

### You MUST have:
- ✅ Written permission from the system owner, OR
- ✅ Authorization through a bug bounty program, OR
- ✅ Testing on your own applications

### Legal Considerations:
- ❌ Unauthorized access to computer systems is **ILLEGAL**
- ❌ Violates laws like the CFAA (US), Computer Misuse Act (UK), and similar laws worldwide
- ❌ Can result in criminal prosecution and civil liability
- ✅ Always follow responsible disclosure guidelines
- ✅ Respect bug bounty program rules and scope

**By using this tool, you accept full responsibility for your actions.**

The creators and contributors of XSS-Sheriff assume no liability for misuse or damage caused by this tool.

---

## 🔬 How It Works

### Scanning Process

1. **Parameter Extraction**: The tool parses the target URL and identifies all query parameters

2. **Payload Injection**: For each parameter, the scanner injects various XSS payloads:
   ```javascript
   <script>alert(1)</script>
   <img src=x onerror=alert(1)>
   <svg onload=alert(1)>
   // ... and more
   ```

3. **Response Analysis**: Checks if the payload is reflected in the HTTP response

4. **Vulnerability Detection**: If a payload appears unescaped in the response, it's flagged as a potential vulnerability

5. **Reporting**: Displays detailed results with URLs, parameters, and payloads

### Detection Logic

XSS-Sheriff uses **reflected XSS detection**:
- Sends HTTP GET requests with payloads in parameters
- Analyzes response body for unescaped payload presence
- Reports potential vulnerabilities for manual verification

**Note**: This is a basic scanner. Always manually verify findings to confirm exploitability and avoid false positives.

---

## 📸 Screenshots

### Main Menu
```
    ╔═══════════════════════════════════════════════════════════════╗
    ║                      🤠 XSS-SHERIFF 🤠                        ║
    ║                                                               ║
    ║                    _.---._    /\\                             ║
    ║                  ./'       "--`\//                            ║
    ║                ./              o \                            ║
    ║               /./\  )______   \__ \                           ║
    ║              ./  / /\ \   | \ \  \ \                          ║
    ║                 / /  \ \  | |\ \  \7                          ║
    ║                  "     "    "  "                              ║
    ║                   *BANG!* 💥 Got that bug!                   ║
    ╚═══════════════════════════════════════════════════════════════╝

  [1] 🔍 XSS Scanner
  [2] 📚 View Payload Library
  [3] ℹ️  About XSS-Sheriff
  [4] 🚪 Exit
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Ideas for Contribution
- 🎨 Improve the UI/UX
- 🔍 Add more XSS payload variations
- 📝 Enhance documentation
- 🧪 Add unit tests
- 🌐 Support POST request testing
- 💾 Add report export functionality

---

## 🗺️ Roadmap

### Version 1.0 ✅
- [x] Basic XSS scanner
- [x] Interactive menu system
- [x] Payload library viewer
- [x] Legal disclaimer integration

### Version 2.0 🚧
- [ ] POST request testing
- [ ] Cookie analysis
- [ ] DOM-based XSS detection
- [ ] JSON/XML report export
- [ ] Configuration file support
- [ ] Concurrent request handling

### Version 3.0 🔮
- [ ] Authentication support (session cookies)
- [ ] Custom payload injection
- [ ] Integration with Burp Suite
- [ ] Wayback Machine integration
- [ ] SQLi detection module
- [ ] CSRF detection module

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 DezTheJackal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 💬 Contact

**DezTheJackal**

- GitHub: [@DezTheJackal](https://github.com/DezTheJackal)
- Twitter: [@DezTheJackal](https://twitter.com/DezTheJackal) *(if applicable)*

### Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue on GitHub:

👉 [Create an Issue](https://github.com/DezTheJackal/xss-sheriff/issues/new)

---

## 🙏 Acknowledgments

- Inspired by the amazing bug bounty and infosec community
- Thanks to all security researchers sharing knowledge
- Built with ❤️ for ethical hackers

---

## 🎓 Learning Resources

New to XSS or bug bounties? Check out these resources:

- [PortSwigger Web Security Academy](https://portswigger.net/web-security/cross-site-scripting)
- [OWASP XSS Guide](https://owasp.org/www-community/attacks/xss/)
- [HackerOne Hacktivity](https://hackerone.com/hacktivity)
- [Bugcrowd University](https://www.bugcrowd.com/hackers/bugcrowd-university/)

---

<div align="center">

**🤠 Happy hunting, Sheriff! Remember: stay legal, stay ethical! 🎯**

⭐ Star this repo if you find it useful!

</div>
