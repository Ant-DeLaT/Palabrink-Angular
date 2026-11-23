import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class Cloudinary {
  private readonly _http = inject(HttpClient);

  // Estos datos los obtienes de tu consola de Cloudinary
  private readonly cloudName = 'sicoo4ms';
  private readonly uploadPreset = 'palabrink_uploader'; // Debe ser un preset configurado como "Unsigned"

  async uploadImage(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    // Cloudinary exige que los datos se envíen como multipart/form-data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    try {
      // Usamos firstValueFrom para convertir el Observable en Promesa y mantener async/await
      const response = await firstValueFrom(this._http.post<any>(url, formData));

      // La propiedad 'secure_url' contiene el enlace HTTPS público de tu imagen
      return response.secure_url;
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
      throw error;
    }
  }
}
