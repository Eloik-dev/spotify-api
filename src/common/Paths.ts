/**
 * Express router paths go here.
 */

export default {
  Base: '/api',
  Liste: {
    Base: '/listes',
    GetAll: '/',
    Get: '/:id',
    Search: '/search',
    Create: '/create',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Musiques: {
    Base: '/musiques',
    Search: '/search/:id',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;