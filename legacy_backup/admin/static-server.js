const express = require('express');
const path = require('path');
const app = express();
const ROOT = path.resolve(__dirname);
// serve static admin UI from this directory
app.use('/', express.static(path.join(ROOT, '..')));
app.get('*', (req, res)=>{
  res.sendFile(path.join(ROOT, '..', 'admin', 'index.html'));
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{ console.log('Static Admin UI at http://localhost:' + PORT); });
