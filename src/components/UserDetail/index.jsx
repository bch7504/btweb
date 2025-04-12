import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Link,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

/**
 * UserDetail component hiển thị thông tin chi tiết của một người dùng.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" color="error">
          Không tìm thấy người dùng với ID: {userId}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }} className="user-detail">
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            <strong>Nơi sống:</strong> {user.location}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            <strong>Mô tả:</strong>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: user.description,
              }}
            />
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            <strong>Nghề nghiệp:</strong> {user.occupation}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to={`/photos/${user._id}`}
            >
              Xem ảnh của {user.first_name}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDetail;