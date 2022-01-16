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

/**
 * Print the breadcrumbs.
 *
 * This function will generate the breadcrumbs for the current page and updates
 * the 'breadcrumbs' element with the list of crumbs.
 */
window.generateBreadcrumbs = function ()
{
  /**
   * Print a single breadcrumb.
   *
   *
   * @param string name   the name of the breadcrumb
   * @param string url    the url of the breadcrumb
   * @param string active wheter this breadcrumb is active or not
   *
   * @return string the breadcrumb string
   */
  function crumb(name, url, active)
  {
    return '<li class="breadcrumb-item' +
           (active ? ' active aria-current="page' : '') + '">' +
           (active ? '' : '<a href="' + url + '">') + name +
           (active ? '' : '</a>') +
           '</li>';
  }

  /* Get the path of the current directory and split it into the list of paths.
   * The trailing slash will be removed to avoid an empty breadcrumb at the end
   * of the list. */
  var crumbs = window.location.pathname.replace(/\/$/, '').split('/');

  /* Iterate over the breadcrumbs and generate a link for each crumb. The home
   * directory will have the special name 'Home' and the current directory will
   * not be a link, but just plain text. */
  var nav  = [];
  var url  = '';
  var path = '';
  for (var i = 0; i < crumbs.length; i++)
    {
      url  += crumbs[i] + '/';
      crumbs[i] = decodeURIComponent(crumbs[i]);
      path += crumbs[i] + '/';
      nav  += crumb(  (i === 0) ? 'Home' : crumbs[i],
                      url,
                      (i === crumbs.length - 1));
    }

  /* Update the breadcrumbs element's contents with the breadcrumbs navigation
   * generated above. */
  document.getElementById('breadcrumbs').innerHTML += nav;

  // needs to be done after altering innerHTML above.
  document.getElementById('copy-path').addEventListener('click' , ()=> {
    navigator.clipboard.writeText(path).then(
      function() {
        /* clipboard successfully set */
        console.log('Success! The text was copied to your clipboard')
      },
      function() {
        /* clipboard write failed */
        console.log('Opps! Your browser does not support the Clipboard API')
      }
    )
  })
}
