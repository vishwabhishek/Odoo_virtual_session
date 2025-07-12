import { Announcement } from "../Schemas/admin.schema.js";

const router = express.Router();

router.get('/announcements', async (req, res) => {
  try {
    const messages = await Announcement.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch announcements' });
  }
});

export default router;
