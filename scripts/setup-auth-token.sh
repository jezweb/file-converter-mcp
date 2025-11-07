#!/bin/bash
set -e

# Generate MCP Auth Token and configure for Cloudflare Workers
# Usage: ./scripts/setup-auth-token.sh [worker-name]

WORKER_NAME="${1:-file-converter-mcp}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DEV_VARS_FILE="$PROJECT_ROOT/.dev.vars"

echo "🔐 Generating new bearer token for $WORKER_NAME..."
echo ""

# Generate secure random token
TOKEN=$(openssl rand -base64 32)

echo "✅ Generated token: $TOKEN"
echo ""

# Update .dev.vars
echo "📝 Updating .dev.vars..."
if [ -f "$DEV_VARS_FILE" ]; then
    # File exists - update or append AUTH_TOKEN
    if grep -q "^AUTH_TOKEN=" "$DEV_VARS_FILE"; then
        # Replace existing AUTH_TOKEN
        sed -i "s|^AUTH_TOKEN=.*|AUTH_TOKEN=$TOKEN|" "$DEV_VARS_FILE"
        echo "   ✓ Updated AUTH_TOKEN in .dev.vars"
    else
        # Append AUTH_TOKEN
        echo "AUTH_TOKEN=$TOKEN" >> "$DEV_VARS_FILE"
        echo "   ✓ Added AUTH_TOKEN to .dev.vars"
    fi
else
    # Create new .dev.vars
    echo "AUTH_TOKEN=$TOKEN" > "$DEV_VARS_FILE"
    echo "   ✓ Created .dev.vars with AUTH_TOKEN"
fi
echo ""

# Update production secret
echo "🚀 Updating production secret..."
echo "   Running: npx wrangler secret put AUTH_TOKEN --name $WORKER_NAME"
echo ""
echo "$TOKEN" | npx wrangler secret put AUTH_TOKEN --name "$WORKER_NAME"
echo ""

echo "✅ Complete! Your MCP server is now configured with:"
echo ""
echo "   Token: $TOKEN"
echo ""
echo "📋 Use this in your MCP client config:"
echo ""
echo '   {
     "url": "https://'"$WORKER_NAME"'.YOUR_SUBDOMAIN.workers.dev/mcp",
     "transport": "http",
     "headers": {
       "Authorization": "Bearer '"$TOKEN"'"
     }
   }'
echo ""
echo "💡 Tip: Save this token securely - you'll need it for MCP client configuration"
