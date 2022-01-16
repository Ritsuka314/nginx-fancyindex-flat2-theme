/* This file is part of nginx-fancyindex-flat-theme.
 *
 * nginx-fancyindex-flat-theme is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.
 *
 * nginx-fancyindex-flat-theme is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
 * Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see
 *
 *  http://www.gnu.org/licenses/
 *
 *
 * Copyright (C)
 *  2018 Alexander Haase <ahaase@alexhaase.de>
 *
 *
 * NOTE: The following comment will be used as short version of the copyright
 *       notice above to be included in compressed files, too.
 */

/*!
 *
 * This file is part of the nginx-fancyindex-flat-theme, licensed under the GNU
 * General Public License. See the LICENSE file for details.
 *
 * Copyright (C)
 *  2018 Alexander Haase <ahaase@alexhaase.de>
 */

import * as fileIcons from "file-icons-js";
import 'file-icons-js/css/style.css'
import '@fortawesome/fontawesome-free/js/all.js'

/**
 * Apply the styling of the directory listing table.
 *
 * The default directory listing table can be styled only basically via CSS.
 * This function will apply additional styles to it and adds an extra column for
 * icons.
 */
window.generateList = async function () {
  const list = document.getElementById("list");

  /* Remove the default style attributes and add the bootstrap table classes. By
   * default, text will be not wrapped. However, long filenames will be, as they
   * use the 'filename' class (see below). */
  list.removeAttribute("cellpadding");
  list.removeAttribute("cellspacing");
  list.classList.add('table', 'table-sm', 'table-hover', 'text-nowrap');

  /* As file size and last-modified date will be hidden at mobile devices, also
   * hide the the table header for mobile devices, as it's unneccessary for the
   * single remaining cell containig the filename. */
  list.tHead.children[0].classList.add('d-none', 'd-md-table-row');

  // add a column for icons to the left
  list.rows[0].insertCell(0);

  /* Iterate over all rows (including the thead) to add individual classes for
   * each cell or adding new cells. */
  // start from row 1, skip header row
  for (var i = 1, row; row = list.rows[i]; i++) {
    /* Add a new cell for the file-type icon. */
    const file = row.cells[0].children[0].innerHTML;
    const isDirectory = file.endsWith("/");
    const icon_class_name = isDirectory ? 'fas fa-folder' : fileIcons.getClassWithColor(file);
    console.log(icon_class_name);
    row.insertCell(0).innerHTML = (i > 0) ? "<i class=\"" + icon_class_name + "\"></i>" : '';

    /* Set the classes for all cells. All cells except the filename will fit
     * their contents. The filename cell is the only allowed to wrap. The last
     * two cells (file size and last-modified date) will be hidden on small
     * (i.e. mobile) devices.*/
    row.cells[0].classList.add('col-auto');
    row.cells[1].classList.add('col', 'filename');
    row.cells[2].classList.add('col-auto', 'd-none', 'd-md-table-cell');
    row.cells[3].classList.add('col-auto', 'd-none', 'd-md-table-cell');

    /* If the file is a picture, add the data attribute for lightbox2, so one
     * is able to easily navigate through the pictures. */
    // TODO fix
    // if (filetype == 'image')
    //   row.cells[1].children[0].setAttribute('data-lightbox', 'roadtrip');
  }
}
