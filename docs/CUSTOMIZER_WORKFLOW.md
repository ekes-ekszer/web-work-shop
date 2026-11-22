# Necklace Customizer Workflow

The necklace customizer is organized as a linear, five-step workflow. It uses
gallery selections for visual materials and explicit strand controls for pearl
construction.

## 1. Choose a ribbon

Browse the ribbon choices in the **Ribbon** section. Use the circular color
filters to narrow the gallery by color, or choose **All** to restore every
option.

Each card shows a visible ribbon swatch and name. Selecting a card applies that
ribbon immediately.

## 2. Choose an end band

In **End band**, browse the available bands and filter them by color. Selecting
a card applies the band to the necklace configuration.

## 3. Choose an end pearl

In **End pearl**, choose the pearl used at the end of the necklace. The end
pearl is separate from the reusable bead sequence on each strand.

## 4. Set the default pearl

The **Pearls** section sets the default color used by strand `+` actions.

Select a circular pearl swatch to change the default. The selected name is
shown beside the palette so the result is explicit.

This default supports rapid repetition:

1. Select one pearl color.
2. Press `+` in a strand as many times as needed.
3. Change the default and add more of another color.

## 5. Configure strands

The **Strands** section manages necklace measurements and bead sequences.

- Use the compact end-length stepper for the necklace end length.
- Use `+ Add strand` to add another strand.
- Use each strand's full-length stepper to adjust that strand.
- Press `+` inside a pearl sequence to add one bead of the currently selected
  default pearl.
- Press a bead to open its color popover.
- Choose a color in the popover to change only that bead.
- Use the circular clear action to remove every bead from a strand.
- Remove additional strands with the strand remove action.

The popover is a local editing window anchored near the selected bead. It
closes when a replacement is chosen, when `Escape` is pressed, when the close
button is used, or when the user clicks outside it.

## Sharing

The **Share this design** panel provides:

- **Copy share link**, which includes the complete design in the URL.
- **Copy code**, which copies the encoded design specification.

If clipboard access is unavailable or denied, the UI reveals the share code so
it can be selected and copied manually.

## Accessibility and interaction rules

- Circle-only controls use visible selected states and accessible names.
- Every control is keyboard reachable.
- The pearl popover supports Tab, arrow keys, Home, End, and Escape.
- Filters and catalogs retain clear selected states.
- Related choices are grouped in numbered sections.
- Large text, native form controls, hover-only actions, and disruptive overlays
  are avoided for primary customization actions.
