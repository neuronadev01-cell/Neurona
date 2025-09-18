import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const data = await req.json()
    console.log("Join form submission:", data)

    // === OPTIONAL: Persist to Google Sheets ===
    // Approach A (recommended for production):
    // - Create a Google Cloud Service Account with Sheets API enabled.
    // - Grant edit access to your spreadsheet to that service account (by email).
    // - Use the `googleapis` npm package server-side to authenticate with the service account key
    //   and append a row to the sheet.
    //
    // Approach B (quick):
    // - Create a Google Apps Script web app that accepts POST requests and appends to your sheet.
    // - Deploy and call its URL from here.
    //
    // For security, store keys/URLs in environment variables (not in code).
    //
    // This route intentionally does not include a full Google Sheets integration to avoid shipping secrets.

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("api/join error:", err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
