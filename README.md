# Svenska Kat - Swedish Language Learning App 🐱

A gamified web application for learning Swedish, featuring audio recording for pronunciation practice, flashcards, achievements, and competitive leaderboards. Learn Swedish the fun way with over 200 phrases!

## 🚀 Use the App

**[✨ Open Svenska Kat →](https://mdubbelm.github.io/zweedsapp)**

No installation required! Works on desktop, tablet, and mobile. Install as PWA for the best experience.

---

![Version](https://img.shields.io/badge/version-1.10.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Phrases](https://img.shields.io/badge/phrases-212-success)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://mdubbelm.github.io/zweedsapp)

## Features

### 🎯 Core Learning Tools

- **Audio Pronunciation Practice** - Record yourself speaking Swedish phrases and compare with native pronunciation
- **Flashcard Mode** - Study Swedish-Dutch translations with interactive flashcards
- **212 Phrases** - Organized across 7 practical categories (30-40 phrases each)
- **Text-to-Speech** - Listen to native Swedish pronunciation at a learner-friendly pace
- **Progressive Difficulty** - Easy, Medium, and Hard levels for each phrase
- **Daily Program** - Personalized selection of 10 phrases per day
- **Difficulty Filter** - Filter daily program by difficulty level (easy/medium/hard)

### 🎮 Gamification

- **Points & Levels** - Earn points for completed phrases and level up as you progress
- **14 Achievement Badges** - Unlock badges for various milestones and accomplishments
- **Daily Streaks** - Track consecutive days of practice
- **Daily Goals** - Complete 10 phrases per day to maintain momentum
- **Perfect Scores** - Earn bonus points for accurate pronunciation
- **Interactive Onboarding** - 10-step tour for new users

### 🏆 Social Features

- **Leaderboard** - Compete with other learners for the top spot
- **Rankings** - See where you stand among all players
- **Public Profiles** - Customize your display name

### 📱 Progressive Web App

- **Mobile Optimized** - Works seamlessly on iOS and Android devices
- **Installable PWA** - Add to home screen for app-like experience
- **Auto-Updates** - Automatic update notifications with one-click update
- **Cloud Sync** - Progress automatically syncs across all your devices
- **Offline Support** - App works without internet connection after first load
- **Service Worker** - Background updates and intelligent caching

## Language Categories

1. **❤️ Begroetingen (Greetings)** - 30 phrases for greetings, thanks, apologies, farewells
2. **☕ Dagelijks (Daily)** - 30 phrases for daily routines, meals, activities
3. **💼 Werk (Work)** - 30 phrases for office work, meetings, communication
4. **✈️ Reizen (Travel)** - 30 phrases for hotels, transportation, navigation
5. **💬 Praten (Conversation)** - 30 phrases for understanding, opinions, questions
6. **🐱 Katten (Cats)** - 30 phrases about cats (featuring Sok, Winnie & Cleo!)
7. **🎒 August Avonturen (Adventures)** - 40 phrases about school, food, forest & winter

## Getting Started

### Prerequisites

- Modern web browser (Chrome 60+, Safari 14+, Firefox 65+, Edge 79+)
- Microphone access for audio recording features
- Internet connection for cloud sync

### Installation

#### Option 1: Use Online (Recommended)
Visit **[https://mdubbelm.github.io/zweedsapp](https://mdubbelm.github.io/zweedsapp)** and create an account to start learning.

No installation needed! The app works in your browser and can be installed as a PWA for offline access.

#### Option 2: Run Locally (Developers)
1. Clone this repository:
   ```bash
   git clone https://github.com/mdubbelm/zweedsapp.git
   cd zweedsapp
   ```

2. Open `index.html` in your web browser:
   ```bash
   open index.html
   ```
   Or use a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

### First-Time Setup

1. **Create Account** - Sign up with email and password
2. **Verify Email** - Check your inbox (and spam folder) for verification email
3. **Complete Setup Guide** - Follow the on-screen tutorial
4. **Grant Permissions** - Allow microphone access for audio recording
5. **Start Learning** - Choose a category and begin your Swedish journey!

## How to Use

### Practice Mode (Pronunciation)

1. Select a category from the home screen
2. Read the Swedish phrase displayed
3. Tap the microphone button to record your pronunciation
4. Listen to your recording
5. Rate your performance (Good or Perfect)
6. Progress automatically to the next phrase

**Tips:**
- Listen to the native pronunciation first using the speaker icon
- Check the pronunciation guide below each phrase
- Practice in a quiet environment for best recording quality

### Flashcard Mode (Memory)

1. Navigate to the Flashcards tab
2. Select a category to study
3. Read the Swedish phrase (front of card)
4. Try to remember the Dutch translation
5. Tap to flip and reveal the answer
6. Use arrows to navigate between cards

**Tips:**
- Review categories you've already practiced in Practice Mode
- Use flashcards for quick review sessions
- Challenge yourself to translate both directions

### Earning Points & Badges

- **Easy phrases**: 10 points
- **Medium phrases**: 15 points
- **Hard phrases**: 20 points
- **Perfect rating**: +5 bonus points
- **Level up**: Every 100 points = 1 level

**Achievement Badges:**
- 🏁 First Steps - Complete 1 phrase
- 📚 Beginner - Complete 10 phrases
- 🎓 Intermediate - Complete 25 phrases
- 🏅 Expert - Complete 50 phrases
- ⭐ Perfectionist - Score 10 perfect ratings
- 🔥 Dedicated - 5-day streak
- 💪 On Fire - 10-day streak
- 🚀 Unstoppable - 20-day streak
- 🎯 Category Master - Complete 1 category
- 🌟 All-Rounder - Complete all 5 categories
- ⚡ Speedster - Complete 20 phrases in one day
- 📈 Level Up - Reach level 5
- 👑 Master - Reach level 10

### Account Settings

- **Display Name** - Customize how you appear on the leaderboard
- **Password** - Change your account password
- **Progress** - View detailed statistics
- **Account** - Delete account and all data (permanent)

## Technical Details

### Built With

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6.4.0
- **Backend**: Supabase (PostgreSQL + Auth)
- **APIs**: MediaRecorder, Web Speech API, Web Audio API

### Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 60+ | Full support |
| Safari | 14+ | iOS 14+ for mobile |
| Firefox | 65+ | Full support |
| Edge | 79+ | Chromium-based |

### Audio Features

- **Recording**: MediaRecorder API with cross-browser format detection
- **Playback**: HTML5 Audio with multiple format fallbacks
- **Text-to-Speech**: Web Speech API (Swedish voice, `sv-SE`)
- **iOS Support**: Special handling for Safari audio quirks

### Privacy & Security

- **Authentication**: Secure email/password via Supabase Auth
- **Data Protection**: Row-level security ensures users only access their own data
- **No Tracking**: No analytics or third-party tracking
- **Local Storage**: Session data stored securely in browser
- **HTTPS**: All API communication encrypted

## Development

### Project Structure

```
zweedsapp/
├── index.html              # Main application (single-file architecture)
├── zweeds-b1-supabase.html # Backup copy
├── CLAUDE.md               # AI assistant guidance
├── CHANGELOG.md            # Version history
├── README.md               # This file
└── .git/                   # Version control
```

### Local Development

1. Edit `index.html` directly
2. Test changes in browser (refresh to see updates)
3. Commit changes with descriptive message
4. Push to deploy (if using CI/CD)

### Adding Content

#### New Phrases
Locate the `categories` object in `index.html` and add to the appropriate category:

```javascript
{
    id: 'g8',
    swedish: 'God morgon!',
    dutch: 'Goedemorgen!',
    pronunciation: 'Good mor-on',
    difficulty: 'easy'
}
```

#### New Categories
Add to the `categories` object following existing patterns:

```javascript
newCategory: {
    icon: 'utensils',
    name: 'Category Name',
    color: 'bg-green-500',
    phrases: [ /* array of phrase objects */ ]
}
```

### Configuration

#### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the database setup SQL (see CLAUDE.md)
3. Update credentials in `index.html`:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'
```

## Troubleshooting

### Audio Not Recording
- Ensure HTTPS is enabled (required for microphone access)
- Check browser permissions for microphone
- Try a different browser if issues persist
- On iOS, make sure Silent Mode is off

### Login Issues
- Verify email address has been confirmed
- Check spam folder for confirmation email
- Try password reset if forgotten
- Clear browser cache and try again

### Progress Not Syncing
- Check internet connection
- Verify you're logged in
- Refresh the page to force sync
- Check browser console for errors

### Badge Not Unlocking
- Ensure you meet the exact requirements
- Some badges check specific conditions (e.g., daily streaks)
- Progress is tracked per completed phrase
- Refresh to see newly earned badges

## Support

- **Bug Reports**: [GitHub Issues](https://github.com/mdubbelm/zweedsapp/issues)
- **Feature Requests**: Submit via GitHub Issues
- **Questions**: Check existing issues or create new one

## 🚧 Contributing

**This is a personal learning project.** I am currently not accepting external contributions or pull requests.

### Why?

Svenska Kat serves as both a language learning tool and a personal development project. I handle all development, design decisions, and feature planning myself to maintain a cohesive vision aligned with specific pedagogical goals.

### Can I Use This Code?

Absolutely! This project is licensed under MIT, which means you're free to:
- ✅ **Fork** the repository and create your own version
- ✅ **Study** the code to learn about PWAs, Supabase, or language learning apps
- ✅ **Adapt** the code for your own projects
- ✅ **Share** your fork with others

### Alternative Ways to Contribute

If you find bugs or have suggestions, you're welcome to:
- Open an issue describing the bug or idea (I may implement it myself)
- Share your thoughts in GitHub Discussions
- Build your own fork with your improvements and share it with the community

### For Developers

If you're interested in building similar functionality:
1. Fork this repository
2. Review the [CLAUDE.md](CLAUDE.md) file for architecture details
3. Build independently and share your learnings!

Thank you for understanding! 🙏

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

**Current Version**: 1.10.1 (November 23, 2025)
- 🎯 Difficulty Preference Filter: Choose your learning level (Beginner to Expert)
- 📱 Daily Program Redesign: Duolingo-style compact card + modal
- 🎲 Mixed Exercise Types: 50% audio practice + 50% writing exercises
- 🔄 Auto-flow through Daily Program: Automatically switches between modes
- ⚙️ Settings: Global difficulty preference applies to all learning modes
- 🏷️ Visual badges show active difficulty filter
- 🔧 Bug fixes: Daily Program caching and modal scrolling

## License

This project is licensed under the MIT License.

## Acknowledgments

- Swedish phrases curated for B1 level learners
- Pronunciation guides based on Dutch phonetics
- Inspired by modern language learning methodologies
- Built with accessibility and mobile-first design principles

## Roadmap

### Coming Soon
- 🎯 Spaced repetition algorithm
- 📊 Advanced progress analytics
- 👥 Social features and friend challenges
- 🎨 Theme customization
- 📱 Native mobile apps

### Future Vision
- 🤖 AI-powered pronunciation grading
- 🗣️ Conversation practice with voice chat
- 📚 Expanded phrase library
- 🌍 Additional language pairs
- 🏫 Teacher/classroom mode

---

**Made with ❤️ for Swedish language learners**

Start your Swedish learning journey today! 🇸🇪
