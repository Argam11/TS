/**
 * Post Routes
 * REST API endpoints for post operations
 */

import { Router, Request, Response } from 'express';
import * as db from '../../shared/mockData.js';
import type { CreatePostInput, UpdatePostInput } from '../../shared/types.js';

const router = Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: authorId
 *         schema:
 *           type: string
 *         description: Filter by author ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of posts to return
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', (req: Request, res: Response) => {
  const authorId = req.query.authorId as string | undefined;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
  
  const posts = db.getPosts(authorId, limit);
  res.json(posts);
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.get('/:id', (req: Request, res: Response) => {
  const post = db.getPostById(req.params.id);
  
  if (!post) {
    res.status(404).json({ error: 'Not Found', message: 'Post not found' });
    return;
  }
  
  res.json(post);
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostRequest'
 *     responses:
 *       201:
 *         description: Post created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 */
router.post('/', (req: Request, res: Response) => {
  const input: CreatePostInput = req.body;
  
  if (!input.title || !input.content) {
    res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
    return;
  }
  
  // Use first user as author for demo
  const newPost = db.createPost(input, '1');
  res.status(201).json(newPost);
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostRequest'
 *     responses:
 *       200:
 *         description: Post updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.put('/:id', (req: Request, res: Response) => {
  const input: UpdatePostInput = req.body;
  const updated = db.updatePost(req.params.id, input);
  
  if (!updated) {
    res.status(404).json({ error: 'Not Found', message: 'Post not found' });
    return;
  }
  
  res.json(updated);
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = db.deletePost(req.params.id);
  
  if (!deleted) {
    res.status(404).json({ error: 'Not Found', message: 'Post not found' });
    return;
  }
  
  res.status(204).send();
});

export default router;

