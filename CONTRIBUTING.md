# Contributing to File Converter MCP

Thank you for your interest in contributing!

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy `.dev.vars.example` to `.dev.vars` and add your keys:
   ```bash
   cp .dev.vars.example .dev.vars
   # Add your PDFCO_API_KEY and AUTH_TOKEN
   ```
4. Create R2 bucket: `npx wrangler r2 bucket create converted-files`
5. Run locally: `npx wrangler dev`

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes with clear commit messages
3. Test thoroughly with `npx wrangler dev`
4. Update documentation if needed (README.md, docs/)
5. Submit PR with description of changes

## Code Standards

- **TypeScript** with strict mode
- **Zod** for input/output validation
- **Error handling**: Always handle errors gracefully
- **JSDoc comments** for public APIs
- **Follow existing patterns**: Check `src/handlers/` for examples

## Adding New Tools

See `docs/IMPLEMENTATION_PHASES.md` for architecture guidance.

New tools should:
1. Be registered in `src/mcp/tools.ts`
2. Have handlers in `src/handlers/`
3. Include Zod schemas for validation
4. Return structured responses
5. Upload results to R2 for permanent storage
6. Handle errors with descriptive messages

### Tool Template

```typescript
// src/handlers/my-new-tool.ts
export async function myNewTool(
  args: { input: string },
  env: Bindings
): Promise<{ outputUrl: string }> {
  // 1. Validate inputs
  // 2. Process with service (Browser/AI/PDF.co)
  // 3. Upload result to R2
  // 4. Return public URL
}
```

## Testing

Test your changes:

```bash
# Start dev server
npx wrangler dev

# Test with cURL
curl -X POST http://localhost:8787/mcp \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"your_tool","arguments":{}}}'
```

## Documentation

Update these files when relevant:
- `README.md` - User-facing features and usage
- `CLAUDE.md` - Project context for development
- `docs/API_ENDPOINTS.md` - New endpoints
- `docs/ARCHITECTURE.md` - Architectural changes
- `CHANGELOG.md` - User-facing changes

## Questions?

Open an issue for discussion before starting large features.

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on the code, not the person
- Provide helpful feedback

Thank you for contributing! 🎉
