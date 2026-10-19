/**
 * Shared assignment data source.
 * Task 01, Task 02 and Task 03 share the same shape so cards and details
 * pages stay consistent. Assignment-specific sections are optional: Task 01
 * uses folderTree/examples/submission content, Task 02 uses
 * componentSections, Task 03 uses figmaUrl, technologies, endpoints and the
 * remaining task-specific requirement lists.
 */

export interface FolderNode {
  name: string;
  children?: FolderNode[];
}

export interface AssignmentExample {
  path: string;
  files: string;
}

export interface AssignmentComponentProp {
  name: string;
  description: string;
}

export interface AssignmentComponentSection {
  title: string;
  intro: string;
  props: AssignmentComponentProp[];
  requirement: string;
}

/** One API endpoint referenced by an assignment, with a clickable URL. */
export interface AssignmentEndpoint {
  purpose: string;
  endpoint: string;
}

export interface Assignment {
  id: string;
  taskLabel: string;
  title: string;
  category: string;
  course?: string;
  shortDescription: string;
  intro: string;
  objective: string;
  requirements?: string[];
  /** External design reference (opened in a new tab). */
  figmaUrl?: string;
  /** Required technologies, shown as a plain list. */
  technologies?: string[];
  /** API endpoints rendered as purpose + clickable, wrapping URL. */
  endpoints?: AssignmentEndpoint[];
  expectedStructure?: string[];
  reactQueryExpectations?: string[];
  restrictions?: string[];
  submissionRequirements?: string[];
  folderTree?: FolderNode[];
  examples?: AssignmentExample[];
  submissionSteps?: string[];
  submissionExampleUrl?: string;
  notes?: string[];
  componentSections?: AssignmentComponentSection[];
  generalRequirements?: string[];
  closing?: string;
}

export const ASSIGNMENTS: Assignment[] = [
  {
    id: '01',
    taskLabel: 'Task 01',
    title: 'React Project Structure Task',
    category: 'Assignment',
    course: 'React Course',
    shortDescription:
      'Practice building a clean, scalable React project structure with clearly organized folders and example files.',
    intro:
      'This assignment establishes the shared foundation every later task builds on: a clean, predictable React workspace where each folder has one clear job.',
    objective:
      'Create a clean and scalable React project structure following a professional and maintainable folder organization.',
    requirements: [
      'Create a React project using the preferred setup; Vite is recommended.',
      'Create a src folder.',
      'Create all required folders inside src.',
      'A complete application is unnecessary; the main focus is project structure.',
      'Add at least one appropriate example file inside relevant folders.',
      'Keep folder and file names clear and consistent.',
      'Push the project to GitHub.',
      'Submit the GitHub repository link.',
    ],
    folderTree: [
      {
        name: 'src/',
        children: [
          {
            name: 'components/',
            children: [
              { name: 'ui/' },
              { name: 'layout/' },
              { name: 'providers/' },
              { name: 'skeleton/' },
              { name: 'common/' },
            ],
          },
          { name: 'hooks/' },
          { name: 'api/' },
          { name: 'types/' },
          { name: 'store/' },
          { name: 'pages/' },
          { name: 'constants/' },
          { name: 'i18n/' },
          { name: 'assets/' },
          { name: 'schemas/' },
          { name: 'utils/' },
        ],
      },
    ],
    examples: [
      { path: 'components/ui', files: 'Button.tsx, Input.tsx' },
      { path: 'components/layout', files: 'Navbar.tsx' },
      { path: 'components/providers', files: 'AppProvider.tsx' },
      { path: 'components/skeleton', files: 'LoadingSkeleton.tsx' },
      { path: 'components/common', files: 'EmptyState.tsx' },
      { path: 'hooks', files: 'useDebounce.ts' },
      { path: 'api', files: 'axios.ts or users.api.ts' },
      { path: 'types', files: 'user.types.ts' },
      { path: 'store', files: 'index.ts or auth.store.ts' },
      { path: 'pages', files: 'Home.tsx, About.tsx' },
      { path: 'constants', files: 'routes.ts' },
      { path: 'i18n', files: 'config.ts or en.json' },
      { path: 'assets', files: 'images, icons, fonts' },
      { path: 'schemas', files: 'user.schema.ts' },
      { path: 'utils', files: 'formatDate.ts' },
    ],
    submissionSteps: [
      'Create a public GitHub repository.',
      'Push the project to GitHub.',
      'Submit the repository URL.',
    ],
    submissionExampleUrl: 'https://github.com/your-username/your-repository',
    notes: [
      'Do not place the required folders outside src.',
      'Keep the structure clean and easy to understand.',
      'Use TypeScript if possible.',
      'The assignment focuses on project organization rather than UI implementation.',
    ],
  },
  {
    id: '02',
    taskLabel: 'Task 02',
    title: 'Reusable Components in React',
    category: 'Assignment',
    course: 'React Course',
    shortDescription:
      'Build reusable Button, Card, and Table components in React, and demonstrate how they can be reused with different props and data.',
    intro:
      'This assignment practices the concept of reusable components: one well-designed implementation used in many places with different props.',
    objective:
      'Create a React application that demonstrates the concept of Reusable Components. Build three reusable components (Button, Card, and Table) and use them in multiple places within the application with different props.',
    componentSections: [
      {
        title: 'Button Component',
        intro: 'Create a reusable Button component that accepts these props:',
        props: [
          { name: 'text', description: 'The text displayed on the button.' },
          { name: 'onClick', description: 'Function to handle click events.' },
          {
            name: 'variant',
            description: 'Style variant, such as primary, secondary, or danger.',
          },
          { name: 'disabled', description: 'Optional boolean to disable the button.' },
        ],
        requirement:
          'Use the Button component at least twice in the application with different props.',
      },
      {
        title: 'Card Component',
        intro: 'Create a reusable Card component that accepts these props:',
        props: [
          { name: 'title', description: 'Card title.' },
          { name: 'description', description: 'Card description or content.' },
          { name: 'image', description: 'Optional image URL.' },
          {
            name: 'children',
            description: 'Support for nested content using the children prop.',
          },
        ],
        requirement:
          'Use the Card component at least twice with different data. Use the children prop in at least one place.',
      },
      {
        title: 'Table Component',
        intro: 'Create a reusable Table component that accepts these props:',
        props: [
          {
            name: 'columns',
            description: 'Array of column headers, for example ["Name", "Age", "City"].',
          },
          { name: 'data', description: 'Array of objects representing the rows.' },
          { name: 'striped', description: 'Optional boolean to enable striped rows.' },
        ],
        requirement:
          'Use the Table component at least once with meaningful data, such as products, students, or users.',
      },
    ],
    generalRequirements: [
      'All components must be reusable and accept props correctly.',
      'Reuse each component multiple times where required, with different props or data.',
      'Use the children prop in the Card component.',
      'Apply clean and consistent styling. CSS, CSS Modules, and Tailwind CSS are acceptable.',
      'Keep the code clean, well-organized, and easy to read.',
      'Ensure the application runs without errors.',
    ],
    closing: 'Good luck!',
  },
  {
    id: '03',
    taskLabel: 'Task 03',
    title: 'Products Page',
    category: 'Assignment',
    course: 'React Course',
    shortDescription:
      'Build a responsive products experience using DummyJSON, TanStack React Query, shadcn/ui Card, and Tailwind CSS, with search, product details, caching, and pagination.',
    intro:
      'This assignment focuses on server state in React. Learners fetch products from the public DummyJSON API, display them with shadcn/ui Card components, and manage fetching, caching, search, product details, and pagination with TanStack React Query and Tailwind CSS.',
    objective:
      'Build a responsive Products page that fetches products from the DummyJSON API, displays them using the shadcn/ui Card component, handles server state and caching with React Query, and provides product search, product details, and pagination.',
    figmaUrl:
      'https://www.figma.com/design/BDviQZgggpowb95BBwXZmw/Cosmetics-E-commerce\u2013Community-?node-id=0-1&p=f&t=pF32TeeZvP9wMdqa-0',
    technologies: [
      'React / Next.js',
      'TypeScript',
      'TanStack React Query',
      'shadcn/ui — Card component',
      'Tailwind CSS',
    ],
    requirements: [
      'Products Listing — Create a Products page and fetch products from https://dummyjson.com/products. Render the returned products in a responsive grid using the shadcn/ui Card component.',
      'React Query & Caching — Use TanStack React Query for fetching and caching product data. Do not use useEffect + useState as the main data-fetching solution.',
      'Product Card — Each card must display useful product information, such as: product image, title, price, rating, and a button or link to view product details.',
      'Product Details — When a user selects a product, navigate to a product details page and fetch the selected product by its ID (for example: https://dummyjson.com/products/1).',
      'Search / Filtering — Add a search input that lets users search products by keyword using the API search endpoint (for example: https://dummyjson.com/products/search?q=phone).',
      'Pagination — Add pagination controls using the API limit and skip parameters (for example: https://dummyjson.com/products?limit=10&skip=10). Do not implement pagination by downloading every product and slicing the full collection locally.',
    ],
    endpoints: [
      { purpose: 'Get Products', endpoint: 'https://dummyjson.com/products' },
      {
        purpose: 'Get Product Details',
        endpoint: 'https://dummyjson.com/products/1',
      },
      {
        purpose: 'Search Products',
        endpoint: 'https://dummyjson.com/products/search?q=phone',
      },
      {
        purpose: 'Pagination Example',
        endpoint: 'https://dummyjson.com/products?limit=10&skip=10',
      },
    ],
    expectedStructure: [
      'Page title: Products.',
      'Search input.',
      'Products grid.',
      'Product cards.',
      'Loading state.',
      'Error state.',
      'Empty search result state.',
      'Pagination controls.',
    ],
    reactQueryExpectations: [
      'Create a clean API function for fetching products.',
      'Use useQuery for the product listing.',
      'Use a queryKey that changes when search or pagination values change.',
      'Take advantage of React Query caching.',
      'Handle isLoading / isPending states appropriately.',
      'Handle API errors and show a user-friendly error state.',
      'Avoid manually storing server response data in local state.',
    ],
    restrictions: [
      'Do not fetch products directly inside the UI component using fetch + useEffect.',
      'Do not store the API response in useState as a substitute for React Query caching.',
      'Do not hard-code product cards.',
      'Do not implement pagination by downloading all products and slicing them locally.',
    ],
    submissionRequirements: [
      'Push the task to the learner\u2019s GitHub repository.',
      'Create a Pull Request.',
      'Ensure the project runs successfully.',
      'Ensure there are no TypeScript or lint errors.',
    ],
    closing: 'Good luck!',
  },
];

export function getAssignmentById(id: string | undefined): Assignment | undefined {
  if (!id) return undefined;
  const normalized = id.padStart(2, '0');
  return ASSIGNMENTS.find((assignment) => assignment.id === normalized);
}
