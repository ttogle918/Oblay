var express = require('express'),
    multer  = require('multer'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    upload = multer({ dest: 'tmp' }),
    Panel = require('../models/panel');
var router = express.Router();
var mimetypes = {
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/png": "png"
};
var layoutList = [
  "w3-display-topleft",  "w3-display-topright",
  "w3-display-bottomleft", "w3-display-bottomright",
  "w3-display-middle", "w3-display-left, w3-display-right",
  "w3-display-topmiddle", "w3-display-bottommiddle",
  "w3-display-container", "w3-display-hover"
];
var shapeList = [
  "w3-circle", "w3-round-small", "w3-round", "w3-round-medium",
  "w3-round-large", "w3-round-xlarge", "w3-round-xxlarge",
  "w3-round-jumbo"
];
/* GET posts listing. */
router.get('/', function(req, res, next) {
  Panel.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('panel/index');
  });
});

// 이미지가 클릭되었을 때 그 이미지를 가져오는 라우터.
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  var panel = new Panel({
    images: images
  });
  panel.save(function(err) {
    if (err) {
      return next(err);
    }
    res.render('panel/index', {panel:panel, layoutList:layoutList, shapeList:shapeList});
  });
});

router.post('/', upload.array('photos'), function(req, res, next) {
  var dest = path.join(__dirname, '../public/images/');
  var images = [];
  if (req.files && req.files.length > 0) {
    _.each(req.files, function(file) {
      var ext = mimetypes[file.mimetype];
      if (!ext) {
        res.redirect('/');
        req.flash('danger', '이미지 파일이 아닙니다.');
        return;
      }
      var filename = file.filename + "." + ext;
      fs.renameSync(file.path, dest + filename);
      images.push("/images/" + filename);
    });
  }

  var panel = new Panel({
    images: images
  });

  panel.save(function(err) {
    if (err) {
      return next(err);
    }
    res.render('panel/index', {panel:panel, layoutList:layoutList, shapeList:shapeList});
  });
});

router.get('/:id', function(req, res, next) {
  Panel.findById(req.params.id, function(err, panel) {
    if (err) {
      return next(err);
    }
    res.render('panel/show', {panel: panel});
  });
});
/*
router.post('/:id/comments', function(req, res, next) {
  var comment = new Comment({
    post: req.params.id,
    email: req.body.email,
    content: req.body.content
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts/' + req.params.id);
    });
  });
});
*/
module.exports = router;
