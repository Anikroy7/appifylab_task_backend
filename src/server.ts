import http from 'http';
import app from './app';
import connectDB from './app/config/db';

// Initialize services
const initializeServices = async () => {
  try {
    // Connect to the database
    const dbHost = await connectDB();
    console.log(`\n✅ MongoDB Connected: ${dbHost}`);


    // Start the server
    const PORT = process.env.PORT || 3000;
    http.createServer(app).listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server initialization failed:', error);
    process.exit(1);
  }
};

// Start the application
initializeServices();
