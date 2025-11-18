# Changelog

All notable changes to Zweeds B1 Language Learning App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.4] - 2025-11-18

### Fixed
- New users no longer see update notification on first login
- Update notification timing improved to show after authentication completes

### Changed
- Audio stream now persists during practice session instead of restarting for each recording
- Optimized microphone permission flow for better iOS experience
- Login form structure improved for better user experience

### Technical
- Moved `checkForUpdates()` call to execute after user authentication
- Set `lastSeenVersion` for new users during signup to prevent false update notifications
- Audio stream remains active until user leaves practice mode

## [1.1.3] - 2025-11-09

### Fixed
- iOS Safari audio playback issues resolved
- Microphone permission handling improved for iOS devices
- Audio resource cleanup and proper stream management
- Bottom navigation positioning fixed to prevent overlap with content

### Changed
- Enhanced audio element reload mechanism for iOS compatibility
- Improved MediaRecorder cleanup on navigation

## [1.1.2] - 2025-11-09

### Added
- "Remember Me" feature on login screen
- Session persistence toggle for user choice between localStorage and sessionStorage
- Enhanced security with session storage options

### Changed
- Authentication flow now respects user's session preference
- Login form includes checkbox for staying logged in

## [1.1.1] - 2025-11-09

### Fixed
- Audio playback stabilization across browsers
- Login error messages now more descriptive and helpful
- Email verification support improved

### Added
- Password reset functionality
- Better error handling for unconfirmed email accounts
- User feedback for authentication errors

## [1.1.0] - 2025-11-09

### Added
- Account settings page
- Audio playback feature for recorded pronunciations
- Update notification system with version change alerts
- Display name customization
- Password change functionality

### Changed
- Improved user experience with clearer navigation
- Enhanced settings interface
- Better visual feedback for user actions

### Fixed
- Various UI polish improvements
- Navigation flow enhancements

## [1.0.0] - 2025-11-09

### Added
- Initial release with core language learning features
- 5 Swedish language categories (Greetings, Daily, Work, Travel, Conversation)
- 35 Swedish phrases with Dutch translations and pronunciation guides
- Audio recording for pronunciation practice using MediaRecorder API
- Text-to-speech playback for Swedish phrases
- Flashcard study mode for memorization
- Gamification system with points and levels
- 14 achievement badges across multiple categories
- Streak tracking for daily practice motivation
- Daily goal system (10 phrases per day)
- Competitive leaderboard showing top 10 players
- User authentication and account management via Supabase
- Cross-device progress synchronization
- Mobile-optimized responsive design
- iOS Safari compatibility with special audio handling
- Progressive difficulty levels (Easy, Medium, Hard)
- Category completion tracking
- Perfect score bonuses (+5 points)

### Technical
- Single-page application architecture with vanilla JavaScript
- Supabase backend integration for authentication and data storage
- Row-level security policies for data protection
- Tailwind CSS for styling
- Font Awesome icons
- Web Audio API and MediaRecorder integration
- Web Speech API for text-to-speech
- LocalStorage for session management and preferences

## Pre-1.0.0 Development

### Initial Development
- Project initialization with basic HTML structure
- Supabase configuration and database setup
- Core SwedishApp class architecture
- Phrase database creation with translations
- Basic UI components and navigation
- Authentication system implementation
- Progress tracking system
- Badge achievement logic
- Leaderboard implementation

---

## Version Support

- **Current Version**: 1.1.4
- **Minimum Browser Requirements**:
  - Chrome 60+
  - Safari 14+ (iOS 14+)
  - Firefox 65+
  - Edge 79+
- **Backend**: Supabase (latest)
- **APIs Used**: MediaRecorder, Web Speech API, Web Audio API

## Upgrade Notes

### Upgrading to 1.1.4
- No database changes required
- Existing user data fully compatible
- New users will have better onboarding experience without false update notifications
- Audio recording sessions will be smoother with persistent microphone access

### Upgrading to 1.1.3
- No database changes required
- Existing user data fully compatible
- Audio recordings may work better on iOS devices
- Clear browser cache if experiencing audio issues

### Upgrading to 1.1.2
- No migration needed
- Users will see new "Remember Me" option on next login
- Existing sessions remain valid

### Upgrading to 1.1.1
- No breaking changes
- Password reset feature available immediately
- Users with unconfirmed emails will see helpful error messages

### Upgrading to 1.1.0
- No data migration required
- All existing user progress preserved
- New settings page available in navigation
- Update notification appears once per version

## Known Issues

### Current
- Audio recording requires HTTPS in production
- Some older iOS devices may have limited audio format support
- Leaderboard updates require page refresh (not real-time)
- Account deletion removes progress but not auth record (admin action required for full deletion)

### Planned Fixes
- Real-time leaderboard updates
- Improved audio format detection
- Better offline support
- Enhanced error recovery for network issues

## Future Roadmap

### Planned Features
- Spaced repetition algorithm for optimal learning
- Social features (friend challenges, shared progress)
- More language categories and phrases
- Custom user-generated phrases
- Pronunciation grading with AI
- Offline mode support
- Mobile app versions (iOS/Android)
- Multi-language support beyond Swedish

### Under Consideration
- Voice chat with native speakers
- Integration with language certification programs
- Teacher/student mode for classroom use
- Advanced statistics and learning analytics
- Customizable difficulty progression
- Theme customization options

---

For detailed technical information, see [CLAUDE.md](CLAUDE.md).
For general usage information, see [README.md](README.md).
