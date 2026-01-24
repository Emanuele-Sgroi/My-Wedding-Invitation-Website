# Open Graph (OG) Setup Guide - Wedding Invitation Website

## Overview

This guide explains how to set up Open Graph (OG) meta tags for your wedding invitation website to ensure proper sharing on social media platforms like Facebook, Twitter, WhatsApp, etc.

## Current Configuration

The website already has OG meta tags configured in [`src/app/layout.js`](src/app/layout.js:19). Here's what's currently set up:

### Open Graph Tags (Facebook, LinkedIn, WhatsApp)
- **Title**: Linh Nhi & Như Quỳnh Wedding
- **Description**: You are invited to our Wedding | Bạn được mời đến dự đám cưới của chúng tôi. | Jesteś zaproszony na nasz Ślub
- **URL**: https://my-wedding-invitation-website.vercel.app/
- **Site Name**: Linh Nhi & Như Quỳnh Wedding
- **Image**: https://my-wedding-invitation-website.vercel.app/images/og-image.JPG (1200x600px)
- **Type**: website

### Twitter Card Tags
- **Card**: summary_large_image
- **Title**: Linh Nhi & Như Quỳnh Wedding
- **Description**: You are invited to our Wedding | Bạn được mời đến dự đám cưới của chúng tôi. | You are invite
- **Image**: https://my-wedding-invitation-website.vercel.app/images/og-image.JPG

## How to Test Your OG Tags

### 1. Facebook Sharing Debugger
Go to: https://developers.facebook.com/tools/debug/
- Enter your website URL
- Click "Scrape Again" to refresh the data
- Check for any warnings or errors

### 2. Twitter Card Validator
Go to: https://cards-dev.twitter.com/validator
- Enter your website URL
- Click "Preview Card" to see how it will appear

### 3. WhatsApp Preview
Simply paste the link in WhatsApp and send it to yourself or a friend to see the preview.

### 4. LinkedIn Post
Create a new post on LinkedIn and paste the link to see the preview.

## Customizing OG Tags

### Change the OG Image

1. Replace the image at [`public/images/og-image.JPG`](public/images/og-image.JPG)
2. Recommended dimensions: 1200x600px (landscape) or 1200x1200px (square)
3. Keep the file name as `og-image.JPG` or update the path in [`src/app/layout.js`](src/app/layout.js:32)

### Change the Title or Description

Edit the metadata in [`src/app/layout.js`](src/app/layout.js:19):

```javascript
export const metadata = {
  title: "Your New Title",
  description: "Your new description here",
  openGraph: {
    title: "Your New Title",
    description: "Your new description here",
    // ... other properties
  },
  twitter: {
    title: "Your New Title",
    description: "Your new description here",
    // ... other properties
  },
};
```

### Add Multiple Images

You can add multiple images for different platforms:

```javascript
openGraph: {
  images: [
    {
      url: "https://yourdomain.com/images/og-image-1.jpg",
      width: 1200,
      height: 600,
      alt: "Wedding Invitation",
    },
    {
      url: "https://yourdomain.com/images/og-image-2.jpg",
      width: 1200,
      height: 1200,
      alt: "Wedding Photo",
    },
  ],
}
```

## Troubleshooting

### Image Not Showing
- Ensure the image is in the `public/images/` folder
- Check that the URL is correct (case-sensitive)
- Verify the image is publicly accessible
- Clear browser cache and test again

### Wrong Title/Description
- Make sure you've deployed the changes
- Clear Facebook's cache using the debugger tool
- Wait a few minutes for CDN to update

### WhatsApp Not Showing Preview
- WhatsApp caches previews aggressively
- Try adding a query parameter: `https://yourdomain.com/?v=1`
- Or use the Facebook debugger to force a refresh

## Best Practices

1. **Image Size**: Use 1200x600px for landscape images (best for most platforms)
2. **File Size**: Keep images under 1MB for faster loading
3. **File Format**: Use JPG for photos, PNG for graphics with transparency
4. **Alt Text**: Always include descriptive alt text for accessibility
5. **Consistency**: Keep title and description consistent across all platforms

## Deployment

After making changes:
1. Commit your changes: `git add . && git commit -m "Update OG tags"`
2. Push to your repository: `git push`
3. Wait for deployment (Vercel will auto-deploy)
4. Test using the tools mentioned above

## Additional Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

## Notes

- The website uses Next.js App Router
- Metadata is defined in [`src/app/layout.js`](src/app/layout.js:19)
- Images are served from the `public/` folder
- The site is deployed on Vercel at `https://my-wedding-invitation-website.vercel.app/`

---

**Last Updated**: January 2026
