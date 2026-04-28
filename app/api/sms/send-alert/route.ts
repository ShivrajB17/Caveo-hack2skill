import { NextResponse } from "next/server";
// import twilio from "twilio";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomNumber, type, id } = body;

    if (!roomNumber || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const messageBody = `URGENT: ${type} alert Room ${roomNumber}. Incident #${id || "New"}`;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;
    const toPhone = process.env.DEFAULT_ALERT_PHONE_NUMBER || "+1234567890";

    if (!accountSid || !authToken || accountSid === "your-twilio-account-sid") {
      console.log("Twilio credentials not configured. Mocking SMS send:");
      console.log(`To: ${toPhone} | Message: ${messageBody}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ success: true, mocked: true, message: "Mock SMS sent successfully" });
    }

    // REAL TWILIO CODE (Uncomment when Twilio is installed and credentials are valid)
    /*
    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({
      body: messageBody,
      from: fromPhone,
      to: toPhone
    });
    console.log("SMS sent with SID:", message.sid);
    */
    
    return NextResponse.json({ success: true, message: "SMS sent successfully" });
  } catch (error: any) {
    console.error("Failed to send SMS:", error);
    return NextResponse.json({ error: error.message || "Failed to send SMS" }, { status: 500 });
  }
}
