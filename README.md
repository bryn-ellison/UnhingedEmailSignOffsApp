# Unhinged Email Sign Off App

Live version can be seen here: https://unhingedemailsignoffs.com/

This is a SLA (silly little app) designed to show my skills in React and associated frontend tech. This app consumes a .NET Core Api backend (which was also built by me and can be seen here: https://github.com/bryn-ellison/UnhingedSignOffApi).

The app has the following features:

- View a random Unhinged Sign Off
- Click/tap button to generate a fresh random Sign Off
- Click/tap copy button to copy Sign Off to user clipboard
- User can submit a new Sign Off using submission form
- Admin area secured with auth0 authentication and authorization using bearer token to secure admin API endpoints
- Admin is able to view lists of Signs Offs that require approval or are approved or deleted
- Admin is able to approve or delete submitted Sign Offs
- Admin is able to edit signoff and author
