# Change Log

## v2.0.0-beta.12

### Bug fixes
This update brings many bug fixes and improvements under the hood.

### Badge
Added a badge component that displays information subscripted or superscipted relative to children.

### Card
Media is now customizable and is better rendered with 4 positions: top, bottom, left, right.

### Dialog
Added a dialog component that overlays on the dom to display information

### DraggableList -> List
Renamed `DraggableList` to `List` with a flag that toggles reordering of elements via drag-and-drop.

### Drawer
Added a drawer component that pops on top of the page from different directions.

### Inputs
- Changed inputs and added more props and better semantics
- Forwarded refs of inputs

### Menu
Created new component `Menu` that pops or hides relative to the anchor.

### Panel
Panel's header is now sticky.

### Slider
Added a slider component (equivalent to HTML's `input type = "range"/>`). This component's [styles](#components) are abstracted for more ease in styling.

### Styles!
#### Components
All components' styles can be extended using `className`, `id` and `style` props. The `style` prop can reference theme-specific values (e.g. `primary` for colours, `radius.normal` for radii, etc), rendering the styles dynamic
#### Theme
- Exposed new function `createTheme` that helps customizing the theme before passing it to `ThemeProvider`.
- Made measurements like sizes and radii customizable in theme
- Added default props and styles to all components, defined in `createTheme`.

## v1.1.0

### Tables
Added tables to the set of UI components. Tables are equipped out-of-the box with:
- column-resizing options, both static, i.e. on component mount, and dynamic, on runtime
- column reordering
- pagination, which can be optionally enabled or not
- sorting based on selected column

### Comboboxes
- Added prop `position` to override where the options list would appear

### DraggableList
Introduced a new sortable list by dragging & dropping items around 