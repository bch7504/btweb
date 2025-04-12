import React, { useState } from "react";
import {
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  Link,
  Alert,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * UserPhotos component: hiển thị ảnh và bình luận của người dùng.
 */
function UserPhotos() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);
  const [imageError, setImageError] = useState({});

  const handleImageError = (photoId) => {
    setImageError((prev) => ({ ...prev, [photoId]: true }));
  };

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Không tìm thấy người dùng với ID: {userId}
        </Alert>
      </Box>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          {user.first_name} {user.last_name} chưa tải ảnh nào.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Ảnh của {user.first_name} {user.last_name}
      </Typography>
      {photos.map((photo, index) => (
        <Card key={photo._id} sx={{ mb: 4, borderRadius: 2 }} elevation={3}>
          <CardContent>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              {imageError[photo._id] ? (
                <Alert severity="warning">
                  Không thể tải ảnh: {photo.file_name}
                </Alert>
              ) : (
                <img
                  src={`/images/${photo.file_name}`}
                  alt={`Ảnh của ${user.first_name}`}
                  style={{
                    width: "100%",
                    maxWidth: 600,
                    height: "auto",
                    borderRadius: 8,
                  }}
                  onError={() => handleImageError(photo._id)}
                />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              Được tải lên vào: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Bình luận:
              </Typography>
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <Box
                    key={comment._id}
                    sx={{
                      p: 1.5,
                      bgcolor: "grey.100",
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      <Link
                        component={RouterLink}
                        to={`/users/${comment.user._id}`}
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                      >
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>{" "}
                      vào {new Date(comment.date_time).toLocaleString()}:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ ml: 2, mt: 0.5 }}
                      dangerouslySetInnerHTML={{ __html: comment.comment }}
                    />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Chưa có bình luận nào.
                </Typography>
              )}
            </Box>
          </CardContent>
          {index < photos.length - 1 && <Divider sx={{ my: 2 }} />}
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;