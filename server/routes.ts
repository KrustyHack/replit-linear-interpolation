import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // This is a client-side app, no API routes needed
  // All calculations are performed in the browser

  const httpServer = createServer(app);

  return httpServer;
}
