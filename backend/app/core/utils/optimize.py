import PIL.Image
from fastapi import UploadFile
import PIL
import io


def optimize_and_save_image(
    new_image: UploadFile,
    save_path: str,
    quality: int = 85,
):
    image_content = new_image.file.read()

    img = PIL.Image.open(io.BytesIO(image_content))

    img = img.convert("RGB")

    img.save(save_path, format="WEBP", optimize=True, quality=quality)
