const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Navigating to first blog post...');
  // Navigate to first blog post
  await page.goto('http://localhost:3000/c-compile-in-mac', {
    waitUntil: 'networkidle'
  });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  // Take screenshot of first page
  await page.screenshot({ 
    path: 'screenshot-c-compile.png',
    fullPage: true 
  });
  console.log('Screenshot saved: screenshot-c-compile.png');

  // Check for table of contents on first page
  const tocExists1 = await page.locator('.table-of-contents, [class*="toc"], [class*="TableOfContents"]').count() > 0;
  console.log(`First page - Table of Contents exists: ${tocExists1}`);
  
  // Check for code blocks with syntax highlighting
  const codeBlocks1 = await page.locator('pre code, .code-block, [class*="language-"]').count();
  console.log(`First page - Code blocks found: ${codeBlocks1}`);

  console.log('\nNavigating to second blog post...');
  // Navigate to second blog post
  await page.goto('http://localhost:3000/mysql-orphan-table', {
    waitUntil: 'networkidle'
  });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  // Take screenshot of second page
  await page.screenshot({ 
    path: 'screenshot-mysql-orphan.png',
    fullPage: true 
  });
  console.log('Screenshot saved: screenshot-mysql-orphan.png');

  // Check for table of contents on second page
  const tocExists2 = await page.locator('.table-of-contents, [class*="toc"], [class*="TableOfContents"]').count() > 0;
  console.log(`Second page - Table of Contents exists: ${tocExists2}`);
  
  // Check for code blocks with syntax highlighting
  const codeBlocks2 = await page.locator('pre code, .code-block, [class*="language-"]').count();
  console.log(`Second page - Code blocks found: ${codeBlocks2}`);

  // Check for syntax highlighting colors
  console.log('\nChecking for syntax highlighting colors...');
  
  // Navigate back to first page to check colors
  await page.goto('http://localhost:3000/c-compile-in-mac', {
    waitUntil: 'networkidle'
  });
  await page.waitForTimeout(1000);
  
  // Check for colorful syntax highlighting
  const colorfulElements = await page.evaluate(() => {
    const codeElements = document.querySelectorAll('code span, code .token, [class*="language-"] span');
    const colors = new Set();
    
    codeElements.forEach(el => {
      const color = window.getComputedStyle(el).color;
      if (color && color !== 'rgb(0, 0, 0)' && color !== 'rgb(255, 255, 255)') {
        colors.add(color);
      }
    });
    
    return Array.from(colors);
  });
  
  console.log(`Syntax highlighting colors found: ${colorfulElements.length > 0 ? 'Yes' : 'No'}`);
  if (colorfulElements.length > 0) {
    console.log('Colors detected:', colorfulElements);
  }

  // Check layout structure
  console.log('\nChecking layout structure...');
  
  // Check if TOC is on the right side
  const tocPosition = await page.evaluate(() => {
    const toc = document.querySelector('.table-of-contents, [class*="toc"], [class*="TableOfContents"]');
    if (toc) {
      const rect = toc.getBoundingClientRect();
      const pageWidth = window.innerWidth;
      return rect.left > pageWidth / 2 ? 'right' : 'left';
    }
    return 'not found';
  });
  
  console.log(`Table of Contents position: ${tocPosition}`);

  // Close browser
  await browser.close();
  
  console.log('\nScreenshots saved! Please check:');
  console.log('- screenshot-c-compile.png');
  console.log('- screenshot-mysql-orphan.png');
})();