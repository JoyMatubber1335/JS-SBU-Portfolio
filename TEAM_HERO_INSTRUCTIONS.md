# Team Impact Hero Instructions

This document provides instructions on how to use the new "Team Impact" hero section that was added to your Payload CMS website, which looks similar to the example in your request.

## Overview

The Team Impact hero section features:

- A heading and description text on the left
- A CTA button
- A team photo on the right
- A testimonial with a quote overlay

## How to Use

### Step 1: Upload Team Image

1. Log in to your Payload CMS admin panel
2. Go to the Media collection
3. Click "Create New" to upload your team image
4. Fill in the alt text (e.g., "Our development team at work")
5. Upload your image file
6. Save the media item and note the ID (or remember which image it is)

### Step 2: Configure Homepage Hero

1. Go to the Pages collection in your admin panel
2. Select the "Home" page (or create it if it doesn't exist)
3. Under the Hero tab, select "Team Impact" from the Type dropdown
4. Add your heading text and description in the rich text editor
5. Add a link/button with your desired CTA text
6. Select the team image you uploaded in Step 1
7. Save the page

### Step 3: Customize (Optional)

If you want to customize the appearance of the hero section:

- Edit the `src/heros/TeamImpact/index.tsx` file to adjust styling
- The testimonial quote is currently hardcoded, but can be modified in the same file
- You can change colors, spacing, and other design elements using Tailwind classes

## Additional Notes

- The testimonial is currently hardcoded in the component. To make it dynamic, you'll need to modify the hero config in `src/heros/config.ts` to add testimonial fields and update the component accordingly.
- The hero is mobile-responsive and will stack vertically on smaller screens.
- If you make changes to the component files, you'll need to rebuild your application.

## Troubleshooting

- If the hero doesn't appear, make sure you've selected the correct hero type ("teamImpact")
- If the image doesn't appear, verify that you've uploaded and selected an image in the media field
