import { Directive, HostBinding, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
})
export class DragDrop {
  droppedFile = output<File>();
  dragging = output<boolean>();

  // Aplica una clase CSS al contenedor cuando el archivo está encima
  @HostBinding('class.drag-over') fileOver = false;

  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    this.dragging.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.dragging.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.dragging.emit(false);

    const files = evt.dataTransfer?.files;
    if (files && files.length > 0) {
      // Validar que sea una imagen antes de emitir
      if (files[0].type.match(/image\/*/)) {
        this.droppedFile.emit(files[0]);
      }
    }
  }
}
