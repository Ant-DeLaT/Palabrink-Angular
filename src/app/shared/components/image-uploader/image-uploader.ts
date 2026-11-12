import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-image-uploader',
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './image-uploader.html',
  styleUrl: './image-uploader.css',
})
export class ImageUploader {
  // private _cloudinary = inject(CloudinaryService);

  isHovering = signal(false);
  isUploading = signal(false);
  uploadedUrl = signal<string | null>(null);

  onFileDropped(file: File) {
    this.processFile(file);
  }

  // Maneja el archivo seleccionado por clic en el input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  private async processFile(file: File) {
    try {
      this.isUploading.set(true);

      // Llamada al servicio de Cloudinary (configurado previamente)
      // const url = await this._cloudinary.uploadImage(file);

      // this.uploadedUrl.set(url);

      //TODO: Aquí puedes emitir la URL al componente padre o guardarla en Firebase
      // console.log('Imagen subida con éxito:', url);
    } catch (error) {
      console.error('Error al subir a Cloudinary', error);
    } finally {
      this.isUploading.set(false);
    }
  }
}
