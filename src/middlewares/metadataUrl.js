import urlMetadata from "url-metadata";

async function getMetadata(){
    const { url } = req.body
    try {
        const metadata = await urlMetadata(url)

        res.locals.titleUrl = metadata.title
        res.locals.descriptionUrl = metadata.description

        if(!metadata.image.startsWith('https://')) {
            res.locals.imageUrl = 'https://' + metadata.source + metadata.image
        } else {
            res.locals.imageUrl = metadata.image
        }
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}
export default getMetadata;
/* 
urlMetadata(`${post.url}`).then(
    function (metadata) {
      console.log(metadata);
    },
    function (error) {
      console.log(error);
    }
  ); */