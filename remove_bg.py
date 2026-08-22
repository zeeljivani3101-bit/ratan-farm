from PIL import Image

def remove_background(image_path, output_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is relatively light (background). 
        # The background is beige (e.g. around 240, 230, 200). 
        # Text is dark blue.
        # We can make anything with R > 150, G > 150, B > 100 transparent.
        # Or better: average brightness > 150
        avg = (item[0] + item[1] + item[2]) / 3
        if avg > 150:
            # Transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_background("public/images/logo.jpg", "public/images/logo.png")
