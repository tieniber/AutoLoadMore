# List View AutoLoadMore Widget

 
## Description

This widget extends the functionality of the Mendix standard List View widget. It enables a List View to automatically load more content as you scroll down a page.

## Use

Simply place this widget directly below a List View, then configure the settings:

- Interval - Choose the interval to run the check to see if we should load more. Default: 250ms
- Preload Factor - A factor to adjust how early content is loaded. A value of 1 means the load more button is clicked when first visible. 1.5 means it starts half a screen height earlier. 2 means it loads one full screen height early.
