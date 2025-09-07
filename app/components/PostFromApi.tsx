import * as React from "react";
import { z } from "zod";
import { safeFetch } from "../lib/safeFetch";
import {
  Paper, Stack, Typography, Alert, CircularProgress, Card, CardContent
} from "@mui/material";

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});
const PostsSchema = z.array(PostSchema);
type Post = z.infer<typeof PostSchema>;

export default function PostsFromAPI() {
  const [posts, setPosts] = React.useState<Post[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await safeFetch("https://jsonplaceholder.typicode.com/posts", PostsSchema);
        setPosts(data.slice(0, 5));
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Unknown error");
      }
    })();
  }, []);

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Fetch + Zod (External Data)</Typography>

      {!posts && !err && (
        <Stack direction="row" spacing={1} alignItems="center">
          <CircularProgress size={20} /> <Typography>Loading…</Typography>
        </Stack>
      )}

      {err && <Alert severity="error">Error: {err}</Alert>}

      {posts && (
        <Stack spacing={2}>
          {posts.map(p => (
            <Card key={p.id} variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>{p.title}</Typography>
                <Typography variant="body2" color="text.secondary">{p.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
