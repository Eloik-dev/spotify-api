/**
 * Express router paths go here.
 */

export default {
  Base: '/api',
  Liste: {
    Base: '/listes',
    GetAll: '/',
    Get: '/:id',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Musiques: {
    Base: '/musiques',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;