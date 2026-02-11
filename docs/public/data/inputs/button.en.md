# Button

Displays a button component to add interactions and reactivity.

> [!TAG]
> 
> *Since* 1.0.0

> [!PANEL]
> 
> ## Props
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | role | `ButtonRoles` | x | `normal` | The role of the button, which changes its colour |
> | type | `ButtonTypes` | x | `filled` | The type of the button |
> | htmlType | `"button" \| "submit" \| "reset"` | x | undefined | The real html type of the button element |
> | disabled | `boolean` | x | undefined | Disables the button from clicks |
> | autofocus | `boolean` | x | undefined | Focuses on the button instance after the button mounts |
> | name | `string` | x | undefined | Focuses on the button instance after the button mounts |
>
> ### Shared props
> - `[!ARIA]`
> - `[!CHILDREN-OPT]`
> - Basic Interactions Callbacks

## Role
The role of a button defines the colour used for this button. It is a visual helper that quickly changes the colour of the button.

A button's role can be one of the following values:
- `normal`: renders a gray button
- `primary`: renders a button coloured as the primary colour
- `alert`: renders a gray button that turns to the error colour on hover
- `warn`: renders a button coloured as the error colour

Check the [combination sheet](#roletype-combination-sheet) for a better visual.

## Type
The type of a button defines its shape.

A button's type can be one of the following values:
- `filled`: The rendered button has a solid background
- `outlined`: The rendered button has an outline and no background
- `link`: The button is rendered in a style of a link

> **! Note**
>
> A button with a type `link` does not render an anchor element (`<a>`) to avoid prop type conflicts. To render an anchor tag use the `Link` component.

> **! Note**
>
> The type prop is to not be confused with the html type attribute given for the button tag. In order to bridge the gap `htmlType` prop is passed as the button type attribute.

## Role/Type Combination Sheet
```ts
///button-role-type-demo///
```

## Availability
Buttons by default are enabled and accept user interactions. But this can be disabled using the `disabled` flag.

```ts
///button-disabled-demo///
<Button onClick = {() => alert ("I'm available")}>Click me</Button>
<Button disabled>I am disabled</Button>
```