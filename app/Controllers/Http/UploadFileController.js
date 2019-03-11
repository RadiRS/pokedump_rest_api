'use strict';

const Helpers = use('Helpers');
const Env = use('Env');

class UploadFileController {
  async index() {
    // return await Helpers.tmpPath('');
    // return Helpers.publicPath('upload');
    // return this.getUrl({ path: '1552298740528char-pikachu.png' });
  }

  // static get computed() {
  //   return ['url'];
  // }

  getUrl({ path }) {
    return `${Env.get('APP_URL')}/public/img/${path}`;
  }

  async show({ params, response }) {
    return await response.download(
      Helpers.publicPath(`uploads/img/${params.path}`)
    );
  }

  async store({ request, response }) {
    let date = new Date();

    const imagePick = request.file('file_upload', {
      types: ['image'],
      size: '2mb'
    });

    await imagePick.move(Helpers.publicPath('uploads/img'), {
      name: date.getTime() + '-' + imagePick.clientName,
      overwrite: true
    });

    if (!imagePick.moved()) {
      return imagePick.error();
    }

    const url = this.getUrl({ path: imagePick.fileName });
    console.log(url);

    return response.status(200).json({ image_url: imagePick });
  }
}

module.exports = UploadFileController;
