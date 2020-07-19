// ./routes/index.js

app.post('/login',
  // passport as middleware
  passport.authenticate('local'),

  // routes handler
  function (req, res) {
    // 如果這個 function 有執行，表示通過驗證
    // 在 req.user 中會回傳被認證的使用者
    res.redirect('/users/' + req.user.username);
  });

// ./routes/index.js

app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  function (req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });