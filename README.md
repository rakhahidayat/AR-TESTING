# AR Testing - MindAR.js Project

Augmented Reality project using MindAR.js and A-Frame to display a 3D cyberpunk car model.

## 🚀 Live Demo

Once deployed, your app will be available at:
- GitHub Pages: `https://[your-username].github.io/[repo-name]/`
- Or custom domain if configured

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer

## 🔧 Deployment to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (e.g., `ar-testing`)
   - **Don't** initialize with README, .gitignore, or license

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/[your-username]/[repo-name].git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy your site

5. **Access your site**:
   - After deployment, your site will be available at:
     `https://[your-username].github.io/[repo-name]/`

### Option 2: Manual GitHub Pages Setup

1. Follow steps 1-3 from Option 1

2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Click Save

3. **Wait for deployment** (usually takes 1-2 minutes)

## 📱 Usage

1. Open the deployed URL on your mobile device
2. Allow camera permissions when prompted
3. Point your camera at the marker image (`AR-TESTING-marker.png`)
4. The 3D cyberpunk car model should appear overlaid on the marker

## 🛠️ Local Development

### Using HTTPS Server (for mobile testing)

```bash
npm run https
```

Then access via:
- Desktop: `https://localhost:8443`
- Mobile: `https://[your-local-ip]:8443`

### Using HTTP Server

```bash
npm start
# or
npm run serve
```

Then access via: `http://localhost:8000`

## 📁 Project Structure

```
├── index.html              # Main AR application
├── marker.mind             # MindAR marker file
├── AR-TESTING-marker.png   # Marker image for tracking
├── cyberpunk_car_gltf/     # 3D model assets
│   ├── scene.gltf
│   ├── scene.bin
│   └── textures/
└── server-https.js         # Local HTTPS server for testing
```

## 🔗 References

- [MindAR.js Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [Sample: Basic AR](https://hiukim.github.io/mind-ar-js-doc/samples/basic.html)

## 📝 Notes

- The app requires HTTPS for camera access on mobile devices
- GitHub Pages automatically provides HTTPS
- Make sure all asset paths are relative (using `./` or `/`)
- The `.mind` file must be accessible via HTTP/HTTPS (not `file://`)

