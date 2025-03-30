const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Initiate GitHub OAuth login
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to GitHub for authentication
 */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to home page after successful authentication
 *       401:
 *         description: Authentication failed
 */
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      res.json({
        message: 'Authentication successful',
        user: {
          id: req.user._id,
          username: req.user.username
        }
      });
    } else {
      res.redirect('/');
    }
  }
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out the current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
 *       500:
 *         description: Server error during logout
 */
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Error during logout' });
    }

    req.session.destroy((err) =>{
      if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({ message: 'Error destroying session'});
      }
      res.clearCookie('connect.sid');

      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({ message: 'Successfully logged out' });
      } else {
        return res.redirect('/');
      }
    });
  });
  // res.redirect('/');
});

/**
 * @swagger
 * /auth/status:
 *   get:
 *     summary: Get current authentication status
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Returns authentication status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     displayName:
 *                       type: string
 *                     avatarUrl:
 *                       type: string
 */
router.get('/status', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? {
      id: req.user._id,
      username: req.user.username,
      displayName: req.user.displayName,
    } : null
  });
});

module.exports = router;