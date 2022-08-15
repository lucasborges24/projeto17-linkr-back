import urlMetadata from "url-metadata";

async function metadataUrl(req, res, next) {
  const { url } = req.body;
  try {
    const metadata = await urlMetadata(url);
    res.locals.urlTitle = metadata.title;
    res.locals.urlDescription = metadata.description;
    res.locals.urlImage = metadata.image;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}
export default metadataUrl;
