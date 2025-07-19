#!/bin/bash

echo "Running layout comparison test..."
echo "Make sure your development server is running on http://localhost:3000"
echo ""

# Run the Playwright script
node check-blog-layouts.js

echo ""
echo "Test completed! Check the generated screenshots:"
echo "- screenshot-c-compile.png"
echo "- screenshot-mysql-orphan.png"