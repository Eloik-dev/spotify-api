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
    Search: '/search',
    Create: '/Create',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;