import os
from PIL import Image
import shutil
from resizeimage import resizeimage


PATH = os.path.abspath('C:\\Users\\javier.gonzalez\\Software\\Youbuk\\src\\multimedia')
NEW_SIZE = [300, 300]
FOLDERS = ['categories', 'subcategories']

os.chdir(PATH)
for folder in FOLDERS:
    imagesFileName = [folder + '\\' + filename for filename in os.listdir(PATH + '\\' + folder)]
    for imageFileName in imagesFileName:
        try:
            with open(imageFileName, 'r+b') as f:
                with Image.open(f) as image:
                    print('Resizing image: ' + imageFileName)
                    newImage = resizeimage.resize_cover(image, NEW_SIZE, validate=True)
                    [basename, extension] = imageFileName.split('.')
                    newImage.save(
                        basename + '_' +
                        str(NEW_SIZE[0]) + 'x' + str(NEW_SIZE[0]) +
                        '.' + image.format)
        except:
            a=0


a= 0