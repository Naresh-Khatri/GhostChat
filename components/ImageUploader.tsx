import { CloseIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Flex, IconButton, Stack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Cropper } from 'react-cropper'

const ImageUploader = ({ onChange }: { onChange: (value: string) => void }) => {
  const cropperRef = useRef<HTMLImageElement>(null)
  const [image, setImage] = useState<string>('')
  const onCrop = () => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    onChange(cropper)
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0] || null
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const image = e.target?.result
      if (!image) return
      setImage(image as string)
    }
    reader.readAsDataURL(file)
  }
  return (
    <>
      {!image ? (
        <Flex direction={'column'} align={'center'} justify={'center'}>
          <Flex
            pos={'relative'}
            justify={'center'}
            align={'center'}
            h={250}
            w={300}
            borderRadius={10}
            border={'4px dashed gray'}
          >
            <Stack
              pos={'absolute'}
              direction={'column'}
              align='center'
              spacing={5}
            >
              <Avatar size={'2xl'} />
              <Button variant={'outline'}>Upload Image</Button>
            </Stack>
            <input
              width='100%'
              height={'100%'}
              style={{ height: '100%', width: '100%', opacity: 0 }}
              type='file'
              onChange={handleFileChange}
            />
          </Flex>
        </Flex>
      ) : (
        <Box pos={'relative'}>
          <IconButton
            pos={'absolute'}
            zIndex={1}
            colorScheme='red'
            right={-4}
            top={-4}
            aria-label='remove image'
            icon={<CloseIcon />}
            onClick={() => setImage('')}
          />
          <Cropper
            src={image || ''}
            style={{ height: 300, width: '100%' }}
            aspectRatio={1 / 1}
            initialAspectRatio={1 / 1}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
        </Box>
      )}
    </>
  )
}

export default ImageUploader
