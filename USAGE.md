# 📘 XSS-Sheriff Usage Guide

Complete guide to using XSS-Sheriff for bug bounty hunting and authorized penetration testing.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding the Interface](#understanding-the-interface)
3. [Running Your First Scan](#running-your-first-scan)
4. [Interpreting Results](#interpreting-results)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Tips](#advanced-tips)
8. [Bug Bounty Workflow](#bug-bounty-workflow)

---

## Getting Started

### Prerequisites Check

Before using XSS-Sheriff, ensure you have:

1. **Node.js installed** (v14+):
   ```bash
   node --version  # Should show v14.0.0 or higher
   ```

2. **Downloaded XSS-Sheriff**:
   ```bash
   git clone https://github.com/DezTheJackal/xss-sheriff.git
   cd xss-sheriff
   ```

3. **Authorization to test** your target system

### First Launch

Open your terminal and run:

```bash
node xss-sheriff.js
```

You should see the XSS-Sheriff banner and main menu.

---

## Understanding the Interface

### Main Menu Options

When you launch XSS-Sheriff, you'll see 4 main options:

```
[1] 🔍 XSS Scanner - Test for Cross-Site Scripting
[2] 📚 View Payload Library
[3] ℹ️  About XSS-Sheriff
[4] 🚪 Exit
```

#### Option 1: XSS Scanner
This is the main scanning tool. It will:
- Ask for legal authorization confirmation
- Prompt for a target URL
- Automatically test all URL parameters
- Display real-time progress
- Show detailed results

#### Option 2: Payload Library
View all 12 XSS payloads that the scanner uses. Great for:
- Learning about XSS attack vectors
- Understanding what's being tested
- Manual testing reference

#### Option 3: About
Information about the tool, version, and creator.

#### Option 4: Exit
Safely close the application.

---

## Running Your First Scan

### Step-by-Step Tutorial

#### 1. Launch the Scanner

From the main menu, press `1` and hit Enter.

#### 2. Read the Legal Disclaimer

**CRITICAL**: You'll see a legal disclaimer. Read it carefully!

```
⚖️  LEGAL DISCLAIMER
═══════════════════════════════════════════════════════════
This tool is for AUTHORIZED security testing ONLY.

• Only test systems you own or have written permission
• Unauthorized access is illegal (CFAA, Computer Misuse Act)
• Always follow responsible disclosure guidelines
• Respect bug bounty program scope and rules
```

#### 3. Confirm Authorization

Type `yes` if you have authorization to test your target.

```
Do you have authorization to test your target? (yes/no): yes
```

**Important**: Never proceed without proper authorization!

#### 4. Enter Target URL

Provide a URL with query parameters:

```
Enter target URL (e.g., https://example.com/search?q=test):
```

**Good examples:**
```
https://example.com/search?q=test
https://testsite.com/products?id=123&category=electronics
http://localhost:8080/api/search?term=hello&filter=all
```

**Bad examples (won't work):**
```
example.com                          # Missing protocol
https://example.com                  # No parameters to test
www.example.com/search              # Missing protocol
```

#### 5. Watch the Scan

The scanner will:
- Extract all parameters from your URL
- Test each parameter with 12 different XSS payloads
- Show real-time progress
- Display any vulnerabilities found

```
🎯 Target acquired: https://example.com/search?q=test
═══════════════════════════════════════════════════════════

Found 1 parameter(s): q

Testing parameter: q
Progress: 12/12 tests

✓ Potential vulnerability found!
```

#### 6. Review Results

After scanning, you'll see a summary:

```
═══════════════════════════════════════════════════════════
📊 SCAN RESULTS
═══════════════════════════════════════════════════════════

Total tests fired: 12
Vulnerabilities found: 2

🚨 VULNERABILITIES DETECTED! 🚨

[1] Vulnerability Found:
    Parameter: q
    Payload: <script>alert(1)</script>
    URL: https://example.com/search?q=<script>alert(1)</script>
```

---

## Interpreting Results

### Understanding Output

#### No Vulnerabilities Found
```
✅ No obvious XSS vulnerabilities detected
💡 Consider manual testing for complex scenarios
```

**What this means:**
- The basic automated tests didn't find issues
- The site may still have vulnerabilities (DOM-based, stored XSS)
- Manual testing with advanced payloads might reveal issues

#### Vulnerabilities Found
```
🚨 VULNERABILITIES DETECTED! 🚨

[1] Vulnerability Found:
    Parameter: search
    Payload: <img src=x onerror=alert(1)>
```

**What this means:**
- The payload was reflected in the response without proper escaping
- This is a **potential** vulnerability (needs verification)
- You should manually test this in a browser

### Vulnerability Severity

Not all findings are equal:

| Finding | Severity | Action |
|---------|----------|--------|
| Payload reflected in `<script>` tag | 🔴 High | Immediate verification needed |
| Payload reflected in HTML attribute | 🟡 Medium | Test for execution context |
| Payload reflected in comment | 🟢 Low | Usually not exploitable |
| Payload reflected but encoded | ✅ None | False positive, properly handled |

---

## Best Practices

### Before Scanning

✅ **DO:**
- Read the bug bounty program scope carefully
- Verify you have authorization
- Start with test/staging environments when possible
- Use a VPN for privacy
- Keep notes of your testing

❌ **DON'T:**
- Scan production systems without permission
- Test payment processing pages (usually out of scope)
- Perform aggressive scans that could cause DoS
- Test during peak hours
- Ignore rate limiting

### During Scanning

✅ **DO:**
- Monitor your scan progress
- Take screenshots of any findings
- Note the exact URL and payload
- Test findings manually to confirm
- Keep your target informed if required

❌ **DON'T:**
- Run multiple concurrent scans (can cause issues)
- Ignore error messages
- Continue if you're blocked (respect rate limits)
- Test too aggressively

### After Scanning

✅ **DO:**
1. **Verify findings manually** in a browser
2. **Document everything:**
   - URL with vulnerable parameter
   - Payload used
   - Screenshot or video proof
   - Steps to reproduce
   - Potential impact
3. **Report responsibly** through proper channels
4. **Follow up** on your report

❌ **DON'T:**
- Publicly disclose before vendor fixes
- Exaggerate severity
- Demand payment/bounties
- Re-test after initial report (unless asked)

---

## Troubleshooting

### Common Issues

#### "No parameters found to test"

**Problem**: Your URL doesn't have query parameters.

**Solution**: Add parameters to test:
```bash
# Instead of:
https://example.com/search

# Try:
https://example.com/search?q=test
```

#### "Invalid URL format"

**Problem**: URL missing protocol (http:// or https://)

**Solution**: Always include the full URL:
```bash
# Wrong:
example.com/search?q=test

# Correct:
https://example.com/search?q=test
```

#### "Connection timeout"

**Problem**: Target isn't responding or is blocking you.

**Solutions**:
- Check if the website is online
- Verify you're not being rate-limited
- Check your internet connection
- Try again in a few minutes

#### "No vulnerabilities found" (but you expect some)

**Possible reasons**:
1. The site has proper XSS protection (good!)
2. Scanner payloads are too basic (try manual testing)
3. XSS exists but is DOM-based (not detected by this tool)
4. Parameters are validated server-side

**Next steps**:
- Try manual testing with complex payloads
- Test for DOM-based XSS with DevTools
- Check for stored XSS possibilities
- Review the site's CSP headers

#### Scanner seems stuck

**Solution**:
- Press `Ctrl+C` to stop
- Restart the tool
- Try with fewer parameters first
- Check target website availability

---

## Advanced Tips

### Finding Good Test Targets

1. **Look for user input fields:**
   - Search boxes
   - Contact forms
   - Comment sections
   - Filter parameters

2. **Check URLs for parameters:**
   ```bash
   # Good candidates:
   /search?q=...
   /products?id=...&category=...
   /profile?user=...
   /api/search?term=...
   ```

3. **Use browser DevTools:**
   - Open Network tab
   - Navigate the site
   - Look for URLs with parameters

### Manual Verification Process

After XSS-Sheriff finds a potential vulnerability:

1. **Copy the vulnerable URL**
2. **Open it in a browser**
3. **Check if JavaScript executes:**
   - Does an alert box appear?
   - Check browser console for errors
   - Inspect the HTML source

4. **Test variations:**
   ```javascript
   // If <script>alert(1)</script> doesn't work, try:
   <img src=x onerror=alert(1)>
   <svg/onload=alert(1)>
   '"><script>alert(1)</script>
   ```

5. **Assess impact:**
   - Can you steal cookies?
   - Can you modify the page?
   - Can you redirect users?

### Testing Different Contexts

XSS can appear in different contexts:

#### HTML Context
```html
<div>USER_INPUT</div>
Payload: <script>alert(1)</script>
```

#### Attribute Context
```html
<input value="USER_INPUT">
Payload: " onload="alert(1)
```

#### JavaScript Context
```html
<script>var name = "USER_INPUT";</script>
Payload: "; alert(1); //
```

#### URL Context
```html
<a href="USER_INPUT">Click</a>
Payload: javascript:alert(1)
```

---

## Bug Bounty Workflow

### Complete Workflow Example

#### 1. Research & Recon
```bash
# Find target program
Visit HackerOne, Bugcrowd, or company's program

# Read the scope
Check which domains/features are allowed

# Map the application
Browse the site, note interesting parameters
```

#### 2. Initial Testing
```bash
# Launch XSS-Sheriff
node xss-sheriff.js

# Test interesting endpoints
https://target.com/search?q=test
https://target.com/profile?user=test
https://target.com/products?id=123
```

#### 3. Document Findings
```markdown
## XSS Vulnerability Report

**Vulnerability Type**: Reflected XSS
**Severity**: Medium
**URL**: https://target.com/search?q=test
**Parameter**: q
**Payload**: <script>alert(document.cookie)</script>

**Proof of Concept**:
1. Navigate to: https://target.com/search?q=<script>alert(1)</script>
2. Observe alert box appears
3. Cookie can be stolen: [screenshot]

**Impact**:
- Account takeover via cookie theft
- Phishing attacks
- Malware distribution

**Recommendation**:
Implement proper output encoding and CSP headers.
```

#### 4. Submit Report
- Use program's submission portal
- Include all details from documentation
- Add screenshots/video
- Be professional and clear

#### 5. Follow Up
- Respond to any questions
- Provide additional info if needed
- Wait patiently for triage
- Celebrate when accepted! 🎉

---

## Learning Resources

Want to improve your XSS hunting skills?

### Recommended Platforms
- **PortSwigger Web Security Academy** (Free!)
- **HackTheBox** (Paid)
- **TryHackMe** (Free tier available)
- **PentesterLab** (Paid)

### Practice Sites
- https://xss-game.appspot.com/
- https://prompt.ml/
- DVWA (Damn Vulnerable Web App)

### Reading Material
- OWASP XSS Prevention Cheat Sheet
- PortSwigger XSS Research Papers
- HackerOne Disclosed Reports

---

## Quick Reference

### Common Commands

```bash
# Launch tool
node xss-sheriff.js

# Make executable (Linux/Mac)
chmod +x xss-sheriff.js
./xss-sheriff.js

# Global install
npm install -g .
xss-sheriff
```

### Keyboard Shortcuts

- `Ctrl + C` - Stop/Exit
- `Enter` - Confirm selection
- `1-4` - Menu navigation

### Test URL Template

```
https://[domain]/[path]?[param1]=[value1]&[param2]=[value2]

Example:
https://example.com/search?q=test&category=all&sort=desc
```

---

## Support

Need help? Found a bug?

- 📧 **Email**: Open an issue on GitHub
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/DezTheJackal/xss-sheriff/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/DezTheJackal/xss-sheriff/issues)
- ⭐ **Star the repo** if you find it useful!

---

<div align="center">

**🤠 Happy hunting, Sheriff!**

*Remember: With great power comes great responsibility.*
*Stay legal. Stay ethical. Report responsibly.*

</div>
