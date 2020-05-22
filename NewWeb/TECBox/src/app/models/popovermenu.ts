/**
 * Interface for the side menu
 */
export interface PopOverMenu{
    /**
     * The text that will be displayed in menu option.
     */
    displayText: string;
    /**
     * Ionic handles every built-in icon as a string.
     */
    icon?: string;
    /**
     * Type is the input type of the menu item.
     */
    type: string;
    /**
     * Is the color of the button, toggle or any input used.
     */
    color?: string;
    /**
     * This the callback that will be executed when the item is selected.
     */
    callback?: (event: CustomEvent) => void;
    /**
     * Value used for toggle operation.
     */
}
