# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Newsletter Feature Setup

The project includes a newsletter subscription feature that allows visitors to subscribe for daily updates.

### Database Setup

1. Run the SQL script in `database_setup.sql` in your Supabase SQL Editor to create the newsletter subscribers table.

### Formspree Setup

1. Go to [Formspree](https://formspree.io) and create a new form for newsletter subscriptions
2. Copy the form ID (looks like `newsletter-signup`)
3. Update the form ID in `src/components/Newsletter.jsx`:
   ```javascript
   const [state, handleSubmit] = useForm("your-actual-form-id");
   ```

### Features

- Email validation and duplicate prevention
- Integration with Supabase for subscriber management
- Formspree integration for email delivery
- Responsive design matching the site's theme
- Success confirmation with visual feedback
