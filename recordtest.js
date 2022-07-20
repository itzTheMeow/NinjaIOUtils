/* A test script that records with audio. */

{
  const stream = new MediaStream();
  let howlStream = Howler.ctx.createMediaStreamDestination();
  Howler.masterGain.connect(howlStream); // redirect the HowlerJS (audio)
  const vid = App.Renderer.view.captureStream(); // capture the game screen
  stream.addTrack(howlStream.stream.getTracks()[0]);
  stream.addTrack(vid.getTracks()[0]);

  const chunks = [];
  const rec = new MediaRecorder(stream, { bitsPerSecond: 40000000 });
  rec.ondataavailable = (e) => chunks.push(e.data);
  rec.onstop = (e) => {
    const blb = new Blob(chunks, { type: "video/webm" });
    window.open(URL.createObjectURL(blb)); // open the compiled video in a new tab
  };
  rec.start();
  setTimeout(() => rec.stop(), 15000); // stops after 15,000ms or 15 seconds
}
