import os
from PIL import Image
import shutil
from resizeimage import resizeimage


PATH = os.path.abspath('C:\\Users\\javier.gonzalez\\Software\\Youbuk\\src\\multimedia')
NEW_SIZE = [300, 300]
FOLDERS = ['categories', 'subcategories', 'services']

os.chdir(PATH)
for folder in FOLDERS:
    destinationFolder = folder + '_300x300'
    if not os.path.exists(destinationFolder):
        os.mkdir(destinationFolder)
    imagesFileName = [folder + '\\' + filename for filename in os.listdir(PATH + '\\' + folder)]
    for imageFileName in imagesFileName:
        try:
            with open(imageFileName, 'r+b') as f:
                with Image.open(f) as image:
                    print('Resizing image: ' + imageFileName)
                    newImage = resizeimage.resize_cover(image, NEW_SIZE, validate=True)
                    # [basename, extension] = imageFileName.split('.')
                    # newImage.save(
                    #    basename + '_' +
                    #    str(NEW_SIZE[0]) + 'x' + str(NEW_SIZE[0]) +
                    #    '.' + image.format)
                    newImage.save(destinationFolder + '\\' + os.path.basename(imageFileName))
        except:
            a=0


a= 0