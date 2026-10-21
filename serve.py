#!/usr/bin/env python3
"""Preview the site locally with caching turned off, so edits always show.

    python3 serve.py          -> http://localhost:8000
    python3 serve.py 8080     -> http://localhost:8080
"""
import http.server, socketserver, sys, os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), NoCache) as httpd:
    print(f"Serving the site at http://localhost:{PORT}  (Ctrl+C to stop)")
    httpd.serve_forever()
